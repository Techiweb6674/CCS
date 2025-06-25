const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();


// ..
const { twiml: { VoiceResponse } } = require('twilio');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// Session store
const sessionData = {};
function getSession(phone) {
  if (!sessionData[phone]) {
    sessionData[phone] = { step: 0, language: 'en' };
  }
  return sessionData[phone];
}

// 🟢 Entry point
app.post('/voice', (req, res) => {
  const from = req.body.From;
  const session = getSession(from);
  session.step = 1;

  const response = new VoiceResponse();
  const gather = response.gather({
    numDigits: 1,
    action: '/handle-language',
    method: 'POST'
  });

  gather.say({ voice: 'Polly.Raveena', language: 'hi-IN' },
    'Kripya bhasha chunen. Angrezi ke liye 1 dabayen. Hindi ke liye 2 dabayen.'
  );

  res.type('text/xml').send(response.toString());
});

// 🔤 Handle language selection
app.post('/handle-language', (req, res) => {
  const from = req.body.From;
  const digit = req.body.Digits;
  const session = getSession(from);

  if (digit === '1') session.language = 'en';
  else if (digit === '2') session.language = 'hi';
  else session.language = 'en';

  session.step = 2;

  const response = new VoiceResponse();
  const gather = response.gather({
    numDigits: 1,
    action: '/handle-action',
    method: 'POST'
  });

  if (session.language === 'hi') {
    gather.say({ voice: 'Polly.Raveena', language: 'hi-IN' },
      'Order cancel karne ke liye 1 dabayen. Replace ke liye 2 dabayen. Track karne ke liye 3 dabayen.'
    );
  } else {
    gather.say({ voice: 'Polly.Joanna', language: 'en-IN' },
      'Press 1 to cancel order. Press 2 to replace order. Press 3 to track order.'
    );
  }

  res.type('text/xml').send(response.toString());
});

// ✅ Handle main action: Cancel / Replace / Track
app.post('/handle-action', (req, res) => {
  const from = req.body.From;
  const digit = req.body.Digits;
  const session = getSession(from);
  const response = new VoiceResponse();

  session.step = 3;
  session.action = digit;

  const gather = response.gather({
    input: 'dtmf',
    numDigits: 6,
    action: '/handle-product-id',
    method: 'POST'
  });

  if (digit === '1') {
    gather.say({ voice: 'Polly.Raveena', language: session.language === 'hi' ? 'hi-IN' : 'en-IN' },
      session.language === 'hi'
        ? 'Kripya product ID darj karein jise aap cancel karna chahte hain.'
        : 'Please enter the product ID you want to cancel.'
    );
  } else if (digit === '2') {
    gather.say({ voice: 'Polly.Raveena', language: session.language === 'hi' ? 'hi-IN' : 'en-IN' },
      session.language === 'hi'
        ? 'Kripya product ID darj karein jise aap replace karna chahte hain.'
        : 'Please enter the product ID you want to replace.'
    );
  } else if (digit === '3') {
    gather.say({ voice: 'Polly.Raveena', language: session.language === 'hi' ? 'hi-IN' : 'en-IN' },
      session.language === 'hi'
        ? 'Kripya product ID darj karein jise aap track karna chahte hain.'
        : 'Please enter the product ID you want to track.'
    );
  } else {
    response.say({ voice: 'Polly.Raveena', language: 'hi-IN' }, "Kripya sahi vikalp chunen.");
    response.redirect('/voice');
  }

  res.type('text/xml').send(response.toString());
});

// 🧾 Final product ID handler
app.post('/handle-product-id', (req, res) => {
  const from = req.body.From;
  const session = getSession(from);
  const productId = req.body.Digits;
  const response = new VoiceResponse();

  const actionMsg = {
    '1': session.language === 'hi'
      ? `Aapka product ${productId} cancel kar diya gaya hai. Dhanyavaad.`
      : `Your product ${productId} has been canceled. Thank you.`,

    '2': session.language === 'hi'
      ? `Aapka product ${productId} replace ke liye bhej diya gaya hai. Dhanyavaad.`
      : `Your product ${productId} has been sent for replacement. Thank you.`,

    '3': session.language === 'hi'
      ? `Aapka product ${productId} shipment me hai. 2 din me pahuch jayega.`
      : `Your product ${productId} is in shipment and will arrive in 2 days.`
  };

  response.say({ voice: 'Polly.Raveena', language: session.language === 'hi' ? 'hi-IN' : 'en-IN' },
    actionMsg[session.action] || "Invalid action."
  );

  // 🔁 Infinite Loop (back to language selection)
  response.redirect('/voice');
  res.type('text/xml').send(response.toString());
});

// 🔁 Start server
app.listen(3000, () => {
  console.log('✅ IVR Server running on port 3000');
});

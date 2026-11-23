/**
 * Wedding invitation — RSVP receiver for Google Sheets.
 * Düğün davetiyesi — Google E-Tablolar için LCV alıcısı.
 *
 * You do NOT need to change anything in this file.
 * Bu dosyada hiçbir şeyi değiştirmeniz GEREKMEZ.
 *
 * Setup / Kurulum: see README → "RSVP form" / "Katılım formu".
 */

var HEADERS = {
  tr: ['Zaman Damgası', 'İsim', 'Soyisim', 'Katılım Durumu', 'Kişi Sayısı', 'Telefon'],
  en: ['Timestamp', 'First name', 'Last name', 'Attending', 'Guests', 'Phone'],
};

var MESSAGES = {
  tr: {
    firstName: 'İsim zorunludur.',
    lastName: 'Soyisim zorunludur.',
    status: 'Katılım durumu seçilmelidir.',
    guests: 'Katılacaksanız kişi sayısı en az 1 olmalıdır.',
    failed: 'Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.',
  },
  en: {
    firstName: 'First name is required.',
    lastName: 'Last name is required.',
    status: 'Please choose whether you will attend.',
    guests: 'If you are attending, the number of guests must be at least 1.',
    failed: 'Something went wrong while saving. Please try again.',
  },
};

function doPost(e) {
  var lang = 'tr';
  try {
    var data = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    lang = data.lang === 'en' ? 'en' : 'tr';
    var msg = MESSAGES[lang];

    // Honeypot: bots fill the hidden "website" field — pretend success, save nothing.
    if (data.website) return json({ ok: true });

    var firstName = clean(data.firstName);
    var lastName = clean(data.lastName);
    var attending = data.attending;
    var errors = [];
    if (!firstName) errors.push(msg.firstName);
    if (!lastName) errors.push(msg.lastName);
    if (attending !== true && attending !== false) errors.push(msg.status);

    // Not attending → always 0 guests; attending → at least 1.
    var guests = attending === false ? 0 : Number(data.guests);
    if (attending === true && (!isFinite(guests) || guests < 1 || Math.floor(guests) !== guests)) {
      errors.push(msg.guests);
    }
    if (errors.length) return json({ ok: false, message: errors.join(' ') });

    var lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
      if (sheet.getLastRow() === 0) {
        sheet.appendRow(HEADERS[lang]);
        sheet.setFrozenRows(1);
      }
      sheet.appendRow([
        new Date(),
        firstName,
        lastName,
        clean(data.statusLabel) || (attending ? 'Yes' : 'No'),
        guests, // a real number, so the column can be summed
        clean(data.phone),
      ]);
    } finally {
      lock.releaseLock();
    }
    return json({ ok: true });
  } catch (err) {
    console.error(err);
    return json({ ok: false, message: MESSAGES[lang].failed });
  }
}

// Opening the web app link in a browser shows this — handy to check the setup.
function doGet() {
  return json({ ok: true, message: 'RSVP endpoint is running.' });
}

function clean(value) {
  var s = value === undefined || value === null ? '' : String(value).trim().slice(0, 200);
  // Stop spreadsheet formula injection (=, +, -, @ at the start of a cell).
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

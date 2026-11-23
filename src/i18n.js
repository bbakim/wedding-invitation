// Built-in texts for every supported language.
// Any of these keys can be overridden from invitation.yaml → texts:
// {date}, {phone} … are placeholders filled in automatically.

export const dictionaries = {
  tr: {
    pageTitle: '', // empty = "<Name1> & <Name2> · Evleniyoruz"
    heroTitle: 'EVLENİYORUZ',
    heroMessage: 'Bu özel günümüzde sizleri de aramızda görmekten mutluluk duyarız.',
    scrollHint: 'Kaydır',

    countdownTitle: 'Düğünümüze Kalan Süre',
    countdownDays: 'Gün',
    countdownHours: 'Saat',
    countdownMinutes: 'Dakika',
    countdownSeconds: 'Saniye',

    programEyebrow: 'Akış',
    programTitle: 'Program',

    detailsTitle: 'Düğün Detayları',
    mapCta: 'Düğün mekanını haritada görmek için tıklayınız',
    mapAlt: '{venue} konumu — harita',

    rsvpDeadline: 'Katılım durumunuzu en geç {date} tarihine kadar lütfen bildiriniz',
    rsvpTitle: 'Katılım Bildirimi',
    rsvpFirstName: 'İsim',
    rsvpFirstNamePlaceholder: 'Adınız',
    rsvpLastName: 'Soyisim',
    rsvpLastNamePlaceholder: 'Soyadınız',
    rsvpStatus: 'Katılım Durumu',
    rsvpStatusChoose: 'Seçiniz',
    rsvpYes: 'Evet, Katılacağım',
    rsvpNo: 'Hayır, Katılmayacağım',
    rsvpGuests: 'Katılım sağlayacak kişi sayısı',
    rsvpGuestsPlaceholder: 'Örn. 2',
    rsvpPhone: 'Telefon (opsiyonel)',
    rsvpPhonePlaceholder: '05xx xxx xx xx',
    rsvpSubmit: 'Katılımı Gönder',
    rsvpSending: 'Gönderiliyor…',
    rsvpCallPrefix: 'Formdan veya',
    rsvpCallSuffix: 'numarasını arayarak katılım durumunuzu bildirebilirsiniz.',
    rsvpThanksTitle: 'Teşekkürler!',
    rsvpThanksMessage: 'Katılım bildiriminiz bize ulaştı. Sizi aramızda görmek için sabırsızlanıyoruz.',
    rsvpErrorFirstName: 'İsim zorunludur.',
    rsvpErrorLastName: 'Soyisim zorunludur.',
    rsvpErrorStatus: 'Katılım durumu seçilmelidir.',
    rsvpErrorGuests: 'Katılacaksanız kişi sayısı en az 1 olmalıdır.',
    rsvpErrorGeneric: 'Gönderim başarısız oldu. Lütfen tekrar deneyin.',

    photosMessage: 'Bu özel günümüzde çekmiş olduğunuz fotoğrafları bize link üzerinden iletebilirsiniz.',
    photosCta: 'Linki açmak için tıklayınız',
    thankYou: 'Teşekkür Ederiz',
  },

  en: {
    pageTitle: '', // empty = "<Name1> & <Name2> · We're getting married"
    heroTitle: "WE'RE GETTING MARRIED",
    heroMessage: 'We would be delighted to have you with us on our special day.',
    scrollHint: 'Scroll',

    countdownTitle: 'Countdown to Our Wedding',
    countdownDays: 'Days',
    countdownHours: 'Hours',
    countdownMinutes: 'Minutes',
    countdownSeconds: 'Seconds',

    programEyebrow: 'Schedule',
    programTitle: 'Program',

    detailsTitle: 'Wedding Details',
    mapCta: 'Tap to see the venue on the map',
    mapAlt: 'Location of {venue} — map',

    rsvpDeadline: 'Kindly reply by {date}',
    rsvpTitle: 'RSVP',
    rsvpFirstName: 'First name',
    rsvpFirstNamePlaceholder: 'Your first name',
    rsvpLastName: 'Last name',
    rsvpLastNamePlaceholder: 'Your last name',
    rsvpStatus: 'Will you attend?',
    rsvpStatusChoose: 'Please choose',
    rsvpYes: "Yes, I'll be there",
    rsvpNo: "No, I can't make it",
    rsvpGuests: 'Number of guests',
    rsvpGuestsPlaceholder: 'e.g. 2',
    rsvpPhone: 'Phone (optional)',
    rsvpPhonePlaceholder: 'Your phone number',
    rsvpSubmit: 'Send RSVP',
    rsvpSending: 'Sending…',
    rsvpCallPrefix: 'You can also RSVP by calling',
    rsvpCallSuffix: '',
    rsvpThanksTitle: 'Thank you!',
    rsvpThanksMessage: "We've received your reply. We can't wait to celebrate with you.",
    rsvpErrorFirstName: 'First name is required.',
    rsvpErrorLastName: 'Last name is required.',
    rsvpErrorStatus: 'Please choose whether you will attend.',
    rsvpErrorGuests: 'If you are attending, the number of guests must be at least 1.',
    rsvpErrorGeneric: 'Something went wrong. Please try again.',

    photosMessage: "Share the photos you take on our special day with us through this link.",
    photosCta: 'Open the link',
    thankYou: 'Thank You',
  },
}

export const locales = { tr: 'tr-TR', en: 'en-US' }

// Shared by the FAQ section and the FAQPage structured data.
import { offer, care, show, terms } from "../site.config.js";

export const faq = [
  {
    q: "Was passiert mit meinen bestehenden Inhalten und Bildern?",
    a: "Ich übernehme sie. Texte und Bilder deiner aktuellen Website kommen sauber aufbereitet auf die neue. Du musst nichts neu vorbereiten. Neue Texte, Fotografie und Übersetzungen sind nicht im Fixpreis enthalten und werden separat vereinbart.",
  },
  {
    q: "Wie lange dauert ein Relaunch?",
    a: `In der Regel ca. ${offer.deliveryDays} Werktage, sobald ich die nötigen Zugänge und deine Rückmeldungen habe. Den genauen Zeitplan siehst du im Angebot.`,
  },
  {
    q: "Was kostet es nach dem Launch (Hosting, Domain, Updates)?",
    a: `Das entscheidest du. Mit Betreuung ${terms.careYearly} (Hosting, Updates, Backups, kleine Änderungen). Ohne Betreuung zahlst du nur, wenn du etwas ändern lässt (${terms.hourly}). Die Domain bezahlst du direkt beim Anbieter.`,
  },
  {
    q: "Muss ich mein Hosting wechseln? Kann ich mein bestehendes behalten?",
    a: "Nein, das musst du nicht. Du kannst dein bisheriges Hosting behalten, in den meisten Fällen lade ich die fertige Website dort hoch. Wenn du möchtest, übernehme ich Hosting und Betreuung.",
  },
  {
    q: "Gehört die Domain mir?",
    a: "Ja. Die Domain ist und bleibt immer auf deinen Namen registriert. Ich kümmere mich auf Wunsch nur um die technischen Einstellungen und die Erneuerung.",
  },
  {
    q: "Funktioniert meine bestehende E-Mail-Adresse weiter?",
    a: "Ja. Ich prüfe vorher, wo deine E-Mails laufen, und übernehme bei der Umstellung die nötigen Einstellungen. So kommen deine E-Mails ohne Unterbruch weiter an.",
  },
  {
    q: "Verliere ich bei Google Rankings, wenn sich die Website ändert?",
    a: "Ich sorge dafür, dass nichts Wichtiges verloren geht: Die Inhalte bleiben, und alte Seiten-Adressen werden auf die passenden neuen weitergeleitet. So finden Besucher und Google deine Seiten weiterhin. Bestimmte Positionen bei Google kann aber niemand garantieren.",
  },
  {
    q: "Kann ich Texte und Bilder später selbst ändern?",
    a: "Ja, mit dem Paket Relaunch mit CMS. Du änderst Texte, Bilder und Produkte selbst, ohne Technikwissen, und erhältst eine persönliche Einführung. Beim Website-Relaunch ohne CMS übernehme ich Änderungen für dich, im Rahmen der Betreuung oder nach Aufwand.",
  },
  {
    q: "Was, wenn mir der Entwurf nicht gefällt?",
    a: `Dann sagst du mir, was nicht passt, und ich überarbeite den Entwurf. ${offer.revisions} sind im Preis inbegriffen. Stimmt die Richtung grundsätzlich nicht, besprechen wir das offen, bevor es weitergeht.${show.guarantee ? ` ${offer.guaranteeText}` : ""}`,
  },
  {
    q: "Wem gehört die Website am Ende?",
    a: "Du erhältst die fertige Website und alle Inhalte. Wiederverwendbare Bausteine bleiben bei mir.",
  },
  {
    q: "Wo liegen meine Daten? Wie steht es mit dem Datenschutz?",
    a: "Übernehme ich das Hosting, nenne ich dir den Anbieter vorab im Angebot. Diese Website hier verwendet keine Cookies und kein Tracking. Was du mir über das Formular schickst, nutze ich nur, um dir zu antworten. Details stehen in der Datenschutzerklärung.",
  },
  {
    q: "Was passiert, wenn ich die Betreuung kündige?",
    a: `Du kündigst mit ${care.noticePeriod}. Website und Domain bleiben bei dir, und ich helfe dir bei der Übergabe an einen anderen Anbieter.`,
  },
  {
    q: "Machst du auch Onlineshops oder andere Spezialwünsche?",
    a: "Ja, als individuelles Projekt. Zum Beispiel einen Onlineshop, ein Buchungssystem, eine mehrsprachige Website oder Automationen. Schick mir deinen Link und beschreibe kurz, was du brauchst. Du erhältst ein separates Angebot.",
  },
];

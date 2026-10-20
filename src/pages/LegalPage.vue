<script setup>
import AppHeader from "../components/AppHeader.vue";
import AppFooter from "../components/AppFooter.vue";
import { proposalEmail } from "../lib/proposal.js";
import { postalAddress } from "../content/legal.js";
defineProps({
  page: {
    type: String,
    required: true,
    validator: (value) => ["impressum", "datenschutz"].includes(value),
  },
});
</script>

<template>
  <a href="#main" class="skip-link">Zum Inhalt springen</a>
  <AppHeader :home-page="false" />
  <main id="main" class="legal-page container">
    <article class="legal-content">
      <a class="legal-back" href="/">← Zur Startseite</a>
      <span class="eyebrow">RECHTLICHE INFORMATIONEN</span>
      <template v-if="page === 'impressum'">
        <h1>Impressum</h1>
        <p>Angaben zum Betreiber von pasquale.dev.</p>
        <section aria-labelledby="operator-title">
          <h2 id="operator-title">Anbieter und Kontakt</h2>
          <address>
            Pasquale Sergi<br />
            pasquale.dev<br />
            <span v-if="postalAddress" class="legal-postal-address"
              >{{ postalAddress }}<br
            /></span>
            Schweiz<br />
            <a :href="`mailto:${proposalEmail}`">{{ proposalEmail }}</a>
          </address>
          <p v-if="!postalAddress" class="legal-notice">
            <strong>Postanschrift noch zu ergänzen.</strong> Strasse,
            Hausnummer, PLZ und Ort werden nachgetragen, sobald die
            Kontaktanschrift feststeht.
          </p>
        </section>
        <section aria-labelledby="imprint-privacy-title">
          <h2 id="imprint-privacy-title">Datenschutz</h2>
          <p>
            Wie diese Website und das Anfrageformular Daten bearbeiten, erfährst
            du in der <a href="/datenschutz">Datenschutzerklärung</a>.
          </p>
        </section>
      </template>
      <template v-else>
        <h1>Datenschutz</h1>
        <p>
          Hier erfährst du, welche Daten beim Besuch von pasquale.dev und bei
          einer Anfrage bearbeitet werden.
        </p>
        <section aria-labelledby="responsible-title">
          <h2 id="responsible-title">Verantwortlich und erreichbar</h2>
          <p>
            Verantwortlich für diese Website ist Pasquale Sergi, Schweiz. Bei
            Fragen zum Datenschutz erreichst du mich unter
            <a :href="`mailto:${proposalEmail}`">{{ proposalEmail }}</a
            >. Die Postanschrift ist im
            <a href="/impressum">Impressum</a> derzeit als noch zu ergänzen
            gekennzeichnet.
          </p>
        </section>
        <section aria-labelledby="hosting-title">
          <h2 id="hosting-title">Hosting und technische Daten</h2>
          <p>
            Die Website und das Anfrageformular werden bei Vercel betrieben.
            Beim Aufruf werden technische Daten wie IP-Adresse, Zeitpunkt,
            aufgerufene Adresse sowie Browser- und Geräteinformationen
            verarbeitet. Vercel kann dafür Server- und Sicherheitsprotokolle
            führen. Das dient der Bereitstellung, Fehlerbehebung und Absicherung
            der Website.
          </p>
        </section>
        <section aria-labelledby="contact-data-title">
          <h2 id="contact-data-title">Deine Anfrage</h2>
          <p>
            Das Formular übermittelt beim Absenden den Website-Link, deine
            E-Mail-Adresse, eine optionale Nachricht und gegebenenfalls das
            gewählte Paket. Der erste Schritt mit dem Website-Link allein sendet
            noch keine Anfrage.
          </p>
          <p>
            Ich verwende deine Angaben, um deine Website einzuschätzen, ein
            Angebot vorzubereiten und deine Anfrage zu beantworten. Für davon
            unabhängiges Marketing verwende ich die Kontaktdaten nicht ohne eine
            geeignete Grundlage.
          </p>
        </section>
        <section aria-labelledby="email-title">
          <h2 id="email-title">E-Mail-Versand und Bearbeitung</h2>
          <p>
            Resend übermittelt die Anfrage als E-Mail an das eingerichtete
            Empfängerpostfach. Deine E-Mail-Adresse wird als Antwortadresse
            verwendet. Für die hier veröffentlichte Kontaktadresse wird Outlook
            von Microsoft genutzt. Auch wenn du direkt per E-Mail schreibst,
            werden die Nachricht und die üblichen E-Mail-Verbindungsdaten im
            Postfach verarbeitet.
          </p>
        </section>
        <section aria-labelledby="retention-title">
          <h2 id="retention-title">Speicherung und Aufbewahrung</h2>
          <p>
            Diese Website führt keine Datenbank mit Formularanfragen.
            Zugestellte Anfragen werden im E-Mail-Postfach bearbeitet;
            beteiligte Anbieter können technische Versand- und
            Sicherheitsprotokolle speichern.
          </p>
          <p>
            Im Websitecode ist keine feste Löschfrist für das Postfach oder die
            Anbieterprotokolle eingerichtet. Die Aufbewahrung richtet sich nach
            dem Bearbeitungszweck, erforderlicher Korrespondenz, gegebenenfalls
            geltenden Aufbewahrungspflichten und den Einstellungen der genutzten
            Dienste. Formularentwürfe bleiben nur im Arbeitsspeicher der
            geöffneten Seite und werden beim Neuladen verworfen.
          </p>
        </section>
        <section aria-labelledby="spam-title">
          <h2 id="spam-title">Schutz vor missbräuchlichen Anfragen</h2>
          <p>
            Ein unsichtbares Prüffeld, die Prüfung der Anfrageherkunft und eine
            technische Anfragekennung helfen, Spam und doppelte E-Mails zu
            vermeiden. Für die Begrenzung von Anfragen verwendet die
            Serverfunktion aus IP-Adressen abgeleitete Hashwerte und Zähler im
            Arbeitsspeicher. Abgelaufene Zähler werden bei folgenden Anfragen
            bereinigt; dafür wird keine Datenbank angelegt.
          </p>
        </section>
        <section aria-labelledby="tracking-title">
          <h2 id="tracking-title">Cookies, Analyse und Schriften</h2>
          <p>
            Die Anwendung setzt keine Analyse- oder Werbecookies und bindet
            keine Analyse- oder Werbetrackingdienste ein. Formulareingaben
            werden nicht in Cookies oder dauerhaftem Browserspeicher abgelegt.
            Die Schrift wird von dieser Website selbst geladen. Externe Videos,
            Karten oder Social-Media-Elemente sind nicht eingebettet.
          </p>
        </section>
        <section aria-labelledby="abroad-title">
          <h2 id="abroad-title">Anbieter und Verarbeitung im Ausland</h2>
          <p>
            Vercel, Resend und Microsoft können Daten je nach eingesetzter
            Infrastruktur auch ausserhalb der Schweiz, insbesondere in den USA,
            verarbeiten. Die konkreten Speicherorte und Einstellungen hängen von
            den genutzten Diensten ab. Weitere Angaben findest du bei den
            Anbietern:
          </p>
          <ul>
            <li>
              <a
                href="https://vercel.com/legal/privacy-notice"
                target="_blank"
                rel="noopener"
                >Datenschutzhinweise von Vercel</a
              >
            </li>
            <li>
              <a
                href="https://resend.com/legal/privacy-policy"
                target="_blank"
                rel="noopener"
                >Datenschutzhinweise von Resend</a
              >
            </li>
            <li>
              <a
                href="https://www.microsoft.com/de-de/privacy/privacystatement"
                target="_blank"
                rel="noopener"
                >Datenschutzhinweise von Microsoft</a
              >
            </li>
          </ul>
        </section>
        <section aria-labelledby="rights-title">
          <h2 id="rights-title">Fragen und Anliegen zu deinen Daten</h2>
          <p>
            Für Fragen oder Anliegen zu Auskunft, Berichtigung oder Löschung
            deiner Daten schreib mir an
            <a :href="`mailto:${proposalEmail}`">{{ proposalEmail }}</a
            >. Ich prüfe dein Anliegen im Rahmen der anwendbaren Datenschutz-
            und Aufbewahrungsvorschriften.
          </p>
        </section>
      </template>
    </article>
  </main>
  <AppFooter :home-page="false" />
</template>

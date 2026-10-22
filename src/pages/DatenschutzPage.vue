<script setup>
// Based on the Swiss Datenschutzgesetz (DSG). Not legal advice: have it
// checked when providers or processes change.
import { site, form } from "../site.config.js";
</script>

<template>
  <article class="legal container prose" aria-labelledby="page-title">
    <h1 id="page-title">Datenschutzerklärung</h1>
    <p class="legal-meta">Stand: 22. Oktober 2026</p>

    <p>
      In dieser Datenschutzerklärung erkläre ich nach dem Schweizer
      Datenschutzgesetz (DSG), welche Personendaten ich beim Besuch dieser
      Website und bei einer Anfrage bearbeite, wozu ich sie brauche und welche
      Rechte du hast.
    </p>

    <h2>1. Verantwortlich</h2>
    <p>
      {{ site.name }}, {{ site.address.postalCode }}
      {{ site.address.locality }}, {{ site.address.country }}<br />
      E-Mail: <a :href="`mailto:${site.email}`">{{ site.email }}</a>
    </p>

    <h2>2. Besuch dieser Website</h2>
    <p>
      Diese Website wird über Cloudflare (Cloudflare Pages) ausgeliefert. Beim
      Aufruf bearbeitet Cloudflare technisch nötige Angaben, zum Beispiel
      IP-Adresse, Datum und Uhrzeit, aufgerufene Seite und Browser, um die
      Website auszuliefern und vor Missbrauch zu schützen. Wie lange diese
      Angaben gespeichert werden, richtet sich nach den Bestimmungen von
      Cloudflare.
    </p>
    <p>
      Diese Website verwendet keine Cookies, keine Analyse- oder
      Tracking-Dienste und keine eingebetteten Inhalte von Drittanbietern. Die
      Schriften werden von diesem Server geladen, nicht von Google Fonts oder
      einem ähnlichen Dienst.
    </p>

    <h2>3. Anfragen über das Formular oder per E-Mail</h2>
    <p>
      Wenn du mir über das Formular oder per E-Mail schreibst, bearbeite ich
      die Angaben, die du mir schickst: die Adresse deiner Website, deine
      E-Mail-Adresse, deine Nachricht und gegebenenfalls das gewählte Paket.
      Ich nutze diese Angaben nur, um deine Anfrage zu beantworten und ein
      Angebot zu erstellen.
    </p>
    <p v-if="form.endpoint">
      Wenn du das Formular absendest, werden deine Angaben über den
      Formulardienst {{ form.serviceName }} an mich zugestellt.
    </p>
    <p v-else>
      Das Formular öffnet eine vorbereitete E-Mail in deinem E-Mail-Programm.
      Die Nachricht wird erst verschickt, wenn du sie selbst absendest.
    </p>
    <p>
      E-Mails werden über den von mir genutzten E-Mail-Dienst verarbeitet.
    </p>

    <h2>4. Kundinnen und Kunden</h2>
    <p>
      Wenn du mich beauftragst, bearbeite ich die für das Projekt und die
      Betreuung nötigen Daten, zum Beispiel Kontaktangaben, Zugangsdaten zu
      Hosting und Domain sowie Rechnungsdaten. Buchhaltungsunterlagen bewahre
      ich so lange auf, wie es das Gesetz verlangt.
    </p>

    <h2>5. Weitergabe und Bearbeitung im Ausland</h2>
    <p>
      Ich verkaufe keine Daten und gebe sie nicht zu Werbezwecken weiter.
      Daten gelangen nur an Dienstleister, die ich für den Betrieb brauche:
      Cloudflare für die Auslieferung der Website<template v-if="form.endpoint"
        >, {{ form.serviceName }} für die Zustellung von
        Formularanfragen</template
      >
      und den von mir genutzten E-Mail-Dienst. Diese Dienstleister können
      Daten auch ausserhalb der Schweiz bearbeiten.
    </p>

    <h2>6. Aufbewahrung</h2>
    <p>
      Anfragen, aus denen kein Auftrag entsteht, lösche ich nach 12 Monaten.
      Andere Daten bewahre ich nur so lange auf, wie es für den Zweck nötig ist
      oder das Gesetz es verlangt.
    </p>

    <h2>7. Deine Rechte</h2>
    <p>
      Du kannst jederzeit Auskunft über deine bei mir gespeicherten Daten
      verlangen und sie berichtigen oder löschen lassen, soweit keine
      gesetzliche Aufbewahrungspflicht besteht. Du kannst der Bearbeitung
      widersprechen und die Herausgabe deiner Daten verlangen. Schreib mir
      dazu an <a :href="`mailto:${site.email}`">{{ site.email }}</a>. Du hast
      ausserdem das Recht, dich an den Eidgenössischen Datenschutz- und
      Öffentlichkeitsbeauftragten (EDÖB) zu wenden.
    </p>

    <h2>8. Sicherheit</h2>
    <p>
      Die Website wird verschlüsselt über HTTPS ausgeliefert. Die
      Verschlüsselung stellt der Hosting-Anbieter bereit. Ich schütze die mir
      anvertrauten Daten mit angemessenen technischen und organisatorischen
      Massnahmen.
    </p>

    <h2>9. Änderungen</h2>
    <p>
      Ich passe diese Datenschutzerklärung an, wenn sich etwas ändert. Es gilt
      die jeweils hier veröffentlichte Fassung.
    </p>
  </article>
</template>

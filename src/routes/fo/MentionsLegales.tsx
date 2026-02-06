import WavyCard from "../../components/WavyCard";
import Button from "../../components/Button";

const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/1UmMX4UpxEJAUEAAA";
const INSTAGRAM_URL = "https://www.instagram.com/sboom_burger/";

export default function MentionsLegales() {
  return (
    <main className="space-y-6">
      <WavyCard>
        <div className="text-3xl font-black">Mentions légales</div>
        <div className="mt-2 text-sm font-semibold text-black/70">
          Informations légales relatives au site et au restaurant SBOOM!.
        </div>
      </WavyCard>

      <WavyCard>
        <div className="space-y-6 text-sm font-semibold text-black/80 leading-relaxed">
          {/* 1 */}
          <section>
            <div className="text-lg font-black text-black">1. Éditeur du site</div>
            <div className="mt-2">
              <div className="font-black text-black">SBOOM! Smash Burger</div>
              <div>En Budron H7, Box 14</div>
              <div>1052 Le Mont-sur-Lausanne — Suisse</div>

              <div className="mt-3 flex flex-wrap gap-2">
                <a href={GOOGLE_MAPS_URL} target="_blank" rel="noreferrer">
                  <Button variant="secondary">Google Maps</Button>
                </a>
                <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
                  <Button variant="secondary">Instagram</Button>
                </a>
              </div>
            </div>
          </section>

          {/* 2 */}
          <section>
            <div className="text-lg font-black text-black">2. Responsable de publication</div>
            <div className="mt-2">
              Le responsable de publication est l’équipe SBOOM!.
            </div>
          </section>

          {/* 3 */}
          <section>
            <div className="text-lg font-black text-black">3. Hébergement</div>
            <div className="mt-2">
              Ce site est hébergé via une infrastructure web moderne (hébergeur et services techniques
              pouvant évoluer). Les données sont stockées conformément aux règles applicables en Suisse
              et en Europe lorsque cela est nécessaire.
            </div>
          </section>

          {/* 4 */}
          <section>
            <div className="text-lg font-black text-black">4. Propriété intellectuelle</div>
            <div className="mt-2">
              L’ensemble du contenu présent sur ce site (textes, images, logos, vidéos, design,
              identité visuelle, éléments graphiques) est la propriété de SBOOM! ou de ses partenaires,
              sauf mention contraire.
              <br />
              Toute reproduction, utilisation ou diffusion sans autorisation écrite est interdite.
            </div>
          </section>

          {/* 5 */}
          <section>
            <div className="text-lg font-black text-black">5. Liens externes</div>
            <div className="mt-2">
              Le site peut contenir des liens vers des services externes (Google Maps, Instagram,
              Uber Eats, Just Eat, etc.). SBOOM! ne peut être tenu responsable du contenu, des
              politiques ou du fonctionnement de ces services tiers.
            </div>
          </section>

          {/* 6 */}
          <section>
            <div className="text-lg font-black text-black">6. Commandes</div>
            <div className="mt-2">
              Les commandes ne sont pas traitées directement sur ce site.
              <br />
              Pour commander, l’utilisateur est redirigé vers les plateformes partenaires{" "}
              <span className="font-black text-black">Uber Eats</span> et{" "}
              <span className="font-black text-black">Just Eat</span>.
            </div>
          </section>

          {/* 7 */}
          <section>
            <div className="text-lg font-black text-black">7. Données personnelles</div>
            <div className="mt-2">
              SBOOM! ne collecte pas volontairement de données personnelles sensibles via ce site.
              <br />
              Si un formulaire de contact est présent, les informations envoyées sont utilisées
              uniquement pour répondre à la demande et ne sont pas revendues.
            </div>
          </section>

          {/* 8 */}
          <section>
            <div className="text-lg font-black text-black">8. Cookies</div>
            <div className="mt-2">
              Ce site peut utiliser des cookies techniques nécessaires au bon fonctionnement
              (performance, sécurité, navigation).
              <br />
              Les services externes (Google, Meta/Instagram, Uber Eats, Just Eat) peuvent également
              déposer leurs propres cookies lors de la navigation via leurs pages.
            </div>
          </section>

          {/* 9 */}
          <section>
            <div className="text-lg font-black text-black">9. Contact</div>
            <div className="mt-2">
              Pour toute question concernant ces mentions légales, vous pouvez contacter SBOOM! via
              la page Contact ou via Instagram.
            </div>
          </section>

          <div className="rounded-blob border border-black/10 bg-black/5 p-4 text-xs font-black text-black/60">
            Dernière mise à jour : {new Date().toLocaleDateString("fr-CH")}
          </div>
        </div>
      </WavyCard>
    </main>
  );
}

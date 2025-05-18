import ReactLenis from "lenis/react";
import { ArchiveRow } from "../components/archive-row";
import { Copy } from "../components/text/copy";
import { useEffect, useState } from "react";
import { getAllStories, getArchive } from "../queries/stories";
import { formatDate } from "../helpers/date-helper";
import { base_url } from "../queries";
import { FullScreenModal } from "../components/full-screen-modal";

export function Archive() {
  const [archives, setArchives] = useState([]);
  const [activeArchive, setActiveArchive] = useState(null);
  const [isModal, setIsModal] = useState(false);

  useEffect(() => {
    getAllStories().then(setArchives);
  }, []);

  return (
    <ReactLenis root>
      <div className="w-screen px-4">
        <div className="mt-40"></div>
        <h1 className="text-7xl font-medium indent-10 w-2/3 leading-[0.95]">
          Plongez dans les fins les plus appréciées par la commu
        </h1>
        <div className="mt-16"></div>
        <Copy>
          <p className="ml-auto mr-32 text-2xl font-medium w-1/2 leading-[1.1]">
            Laissez-vous emporter par les fins les plus marquantes, celles qui ont conquis le cœur
            de la communauté. Des dénouements soigneusement écrits, applaudis pour leur impact, leur
            émotion ou leur originalité.
          </p>
        </Copy>
        <div className="mt-32"></div>
        {archives.map((archive, index) => (
          <ArchiveRow
            key={index}
            text={archive.titre}
            author={""}
            date={formatDate(archive.date)}
            image={`${base_url}${archive.image}`}
            onClick={() => {}}
          />
        ))}
        {/* <ArchiveRow
          text={"Comment l’art numérique révolutionne la scène contemporaine"}
          author={"Lina Rakotomalala"}
          date={"28 février 2024"}
          image={"/images/2.png"}
        />
        <ArchiveRow
          text={"Les traditions culinaires de l’océan Indien en lumière"}
          author={"Tojo Ranaivo"}
          date={"3 mars 2024"}
          image={"/images/3.png"}
        />
        <ArchiveRow
          text={"L’impact du changement climatique à Madagascar"}
          author={"Fanja Rabemananjara"}
          date={"17 avril 2024"}
          image={"/images/4.png"}
        />
        <ArchiveRow
          text={"Voyage à travers les légendes des Hautes Terres"}
          author={"Jean-Michel Rakoto"}
          date={"22 avril 2024"}
          image={"/images/5.png"}
        />
        <ArchiveRow
          text={"Portraits de femmes engagées dans le développement local"}
          author={"Hanitra Razafindrakoto"}
          date={"7 mai 2024"}
          image={"/images/6.png"}
        />
        <ArchiveRow
          text={"Architecture malgache : entre tradition et modernité"}
          author={"Eric Randriamampionona"}
          date={"13 mai 2024"}
          image={"/images/7.png"}
        />
        <ArchiveRow
          text={"La jeunesse face aux défis du numérique en Afrique"}
          author={"Nirina Andriamanjato"}
          date={"18 mai 2024"}
          image={"/images/8.png"}
        />
        <ArchiveRow
          text={"Redécouvrir les instruments de musique traditionnels"}
          author={"Mamy Rakotobe"}
          date={"19 mai 2024"}
          image={"/images/9.png"}
        />
        <ArchiveRow
          text={"Chroniques d’un village côtier en mutation"}
          author={"Tiana Rabary"}
          date={"20 mai 2024"}
          image={"/images/10.png"}
        />
        <ArchiveRow
          text={"Les secrets des gravures rupestres du sud malgache"}
          author={"Soa Randrianarisoa"}
          date={"21 mai 2024"}
          image={"/images/11.png"}
        />
        <ArchiveRow
          text={"La renaissance de l’artisanat textile à Antsirabe"}
          author={"Jimmy Ravelonarivo"}
          date={"22 mai 2024"}
          image={"/images/12.png"}
        />
        <ArchiveRow
          text={"Musique urbaine : une nouvelle voix pour la jeunesse"}
          author={"Claudine Rasoanaivo"}
          date={"23 mai 2024"}
          image={"/images/13.png"}
        />
        <ArchiveRow
          text={"À la découverte des plantes médicinales ancestrales"}
          author={"Patrick Ramamonjisoa"}
          date={"24 mai 2024"}
          image={"/images/14.png"}
        />
        <ArchiveRow
          text={"Éducation rurale : initiatives locales et impacts"}
          author={"Tsiory Ramiandrisoa"}
          date={"25 mai 2024"}
          image={"/images/15.png"}
        />
        <ArchiveRow
          text={"Les fêtes traditionnelles malgaches à travers les âges"}
          author={"Naivo Ratsimbazafy"}
          date={"26 mai 2024"}
          image={"/images/16.png"}
        />
        <ArchiveRow
          text={"La photographie comme mémoire collective"}
          author={"Faniry Rakotomalala"}
          date={"27 mai 2024"}
          image={"/images/17.png"}
        />
        <ArchiveRow
          text={"L’art de la vannerie et sa transmission intergénérationnelle"}
          author={"Delphine Raharinosy"}
          date={"28 mai 2024"}
          image={"/images/18.png"}
        />
        <ArchiveRow
          text={"Sport et cohésion sociale dans les quartiers populaires"}
          author={"Michel Ranarison"}
          date={"29 mai 2024"}
          image={"/images/19.png"}
        />
        <ArchiveRow
          text={"Regards croisés sur la diaspora malgache"}
          author={"Voahirana Raveloson"}
          date={"30 mai 2024"}
          image={"/images/20.png"}
        /> */}
        <FullScreenModal />
        <div className="h-96"></div>
      </div>
    </ReactLenis>
  );
}

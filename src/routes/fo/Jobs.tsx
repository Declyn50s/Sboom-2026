import WavyCard from "../../components/WavyCard";

export default function Jobs() {
  return (
    <div className="space-y-6">
      <WavyCard>
        <div className="text-3xl font-black">Jobs</div>
        <div className="mt-4 text-sm font-semibold text-black/70 space-y-3">
          <p>Tu veux rejoindre l’équipe ?</p>
          <p>
            Envoie ton CV à : <span className="font-black text-black">jobs@sboom.ch</span>
          </p>
        </div>
      </WavyCard>
    </div>
  );
}

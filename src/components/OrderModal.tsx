import Button from "./Button";

const UBER_EATS_URL =
  "https://www.ubereats.com/ch/store/sboom-smash-burger/JmeMYJA7WhCDlrCpSujPqg?diningMode=PICKUP&utm_campaign=CM2508147-search-free-nonbrand-google-pas_e_all_acq_Global&utm_medium=search-free-nonbrand&utm_source=google-pas";
const JUST_EAT_URL =
  "https://www.just-eat.ch/speisekarte/sboom-smash-burger?serviceType=collection&utm_source=google&utm_medium=organic&utm_campaign=foodorder";

export default function OrderModal({
  open,
  onClose,
  title = "Commander",
  subtitle = "Choisis ta plateforme",
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200]">
      {/* overlay */}
      <button
        aria-label="Fermer"
        onClick={onClose}
        className="absolute inset-0 bg-black/60"
      />

      {/* modal */}
      <div className="absolute left-1/2 top-1/2 w-[92%] max-w-md -translate-x-1/2 -translate-y-1/2">
        <div className="rounded-blob border border-black/10 bg-sboom-light shadow-punch p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-2xl font-black">{title}</div>
              <div className="mt-1 text-sm font-semibold text-black/70">
                {subtitle}
              </div>
            </div>

            <button
              onClick={onClose}
              className="rounded-full border border-black/10 bg-black/5 px-3 py-1 text-sm font-black hover:bg-black/10"
            >
              ✕
            </button>
          </div>

          <div className="mt-4 grid gap-2">
            <a href={UBER_EATS_URL} target="_blank" rel="noreferrer">
              <Button className="w-full">Uber Eats</Button>
            </a>
            <a href={JUST_EAT_URL} target="_blank" rel="noreferrer">
              <Button className="w-full" variant="secondary">
                Just Eat
              </Button>
            </a>
          </div>

          <div className="mt-3 text-xs font-black text-black/60">
            Commandes uniquement via Uber Eats / Just Eat.
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { joinWaitlist } from "../lib/waitlist";

export default function WaitlistForm({
  source,
  placeholder = "el.teu@email.com",
  buttonLabel = "Vull accés anticipat",
  inputClassName = "h-input",
  compact = false,
  note,
  onSuccess,
}) {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    const result = await joinWaitlist(email, source);
    setLoading(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setSuccess(true);
    setEmail("");
    onSuccess?.();
  };

  if (success) {
    return <div className="ok">✓ Perfecte! Et contactem ben aviat.</div>;
  }

  return (
    <>
      <div className={compact ? "h-form" : "cta-form"}>
        <input
          className={inputClassName}
          style={compact ? undefined : { maxWidth: 300 }}
          type="email"
          placeholder={placeholder}
          value={email}
          disabled={loading}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          aria-label="Email llista d'espera"
          aria-invalid={!!error}
        />
        <button type="button" className={`btn${loading ? " loading" : ""}`} disabled={loading} onClick={handleSubmit}>
          {loading ? "Enviant…" : buttonLabel}
        </button>
      </div>
      {error && (
        <p className="err" role="alert">
          {error}
        </p>
      )}
      {note && <p className="h-note">{note}</p>}
    </>
  );
}

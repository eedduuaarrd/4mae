import { useState } from "react";
import { joinWaitlist } from "../lib/waitlist";

export default function WaitlistForm({
  source,
  placeholder = "el.teu@email.com",
  buttonLabel = "Vull accés anticipat",
  successMessage = "✓ Perfecte! Et contactem ben aviat.",
  inputClassName = "h-input",
  compact = false,
  note,
  onSuccess,
}) {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (loading) return;
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
    return <div className="ok">{successMessage}</div>;
  }

  const formClass = compact ? "h-form waitlist-form" : "cta-form waitlist-form";

  return (
    <div className="waitlist-wrap">
      <form className={formClass} onSubmit={handleSubmit} noValidate>
        <input
          className={inputClassName}
          style={compact ? undefined : { maxWidth: 300 }}
          type="email"
          name="email"
          autoComplete="email"
          placeholder={placeholder}
          value={email}
          disabled={loading}
          onChange={(ev) => {
            setEmail(ev.target.value);
            setError("");
          }}
          aria-label="Email llista d'espera"
          aria-invalid={!!error}
          aria-describedby={error ? `waitlist-err-${source}` : undefined}
        />
        <button type="submit" className={`btn${loading ? " loading" : ""}`} disabled={loading}>
          {loading ? "Enviant…" : buttonLabel}
        </button>
      </form>
      {error && (
        <p id={`waitlist-err-${source}`} className="err" role="alert">
          {error}
        </p>
      )}
      {note && <p className="h-note">{note}</p>}
    </div>
  );
}


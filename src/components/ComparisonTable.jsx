import { COMPARISON_ROWS } from "../data/content";

function CellValue({ v }) {
  if (v === "✓") return <span className="chk">✓</span>;
  if (v === "✗") return <span className="crs">—</span>;
  return <span className="prt">{v}</span>;
}

export default function ComparisonTable() {
  const cols = ["4mæ", "TrainingPeaks", "Nike Run Club", "Entrenador personal"];

  return (
    <>
      <div className="tbl-wrap tbl-desktop">
        <table className="tbl">
          <thead>
            <tr>
              <th style={{ width: "26%" }}>Funcionalitat</th>
              <th className="hl">4mæ</th>
              {cols.slice(1).map((c) => (
                <th key={c}>{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPARISON_ROWS.map(([fn, ...vs]) => (
              <tr key={fn}>
                <td className="fn">{fn}</td>
                {vs.map((v, i) => (
                  <td key={i} className={i === 0 ? "hl" : ""}>
                    <CellValue v={v} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="cmp-cards tbl-mobile">
        {COMPARISON_ROWS.map(([fn, ...vs]) => (
          <article className="cmp-card" key={fn}>
            <h3 className="cmp-fn">{fn}</h3>
            <ul className="cmp-values">
              {cols.map((label, i) => (
                <li key={label} className={i === 0 ? "cmp-row hl" : "cmp-row"}>
                  <span className="cmp-label">{label}</span>
                  <span className="cmp-val">
                    <CellValue v={vs[i]} />
                  </span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </>
  );
}

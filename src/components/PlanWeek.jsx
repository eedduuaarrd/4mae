import { useInView } from "../hooks/useInView";
import { WEEK, P_CLASS, P_LABEL } from "../data/content";

export default function PlanWeek() {
  const [ref, inView] = useInView({ threshold: 0.2 });

  return (
    <div className="plan-week" ref={ref}>
      <div className="wk">
        <div className="wk-hd">
          <span className="wk-title">Setmana 8 · Preparació Marató BCN</span>
          <span className="wk-tag">Adaptat avui</span>
        </div>
        {WEEK.map((d) => (
          <div className="dr" key={d.d}>
            <span className="dr-day">{d.d}</span>
            <span className={`pill ${P_CLASS[d.t]}`}>{P_LABEL[d.t]}</span>
            <div className="dr-info">
              <b>{d.l}</b>
              <small>{d.i}</small>
            </div>
            <div className="dr-load">
              <div className="dr-pct">{d.p}%</div>
              <div className="lb">
                <div
                  className={`lf${inView ? " animate" : ""}`}
                  style={{
                    width: inView ? `${d.p}%` : "0%",
                    opacity: d.t === "rest" ? 0.35 : 1,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
        <div className="adapt-box">
          <span className="adapt-ico" aria-hidden>
            ⚡
          </span>
          <div className="adapt-txt">
            Pla adaptat avui: HRV baix detectat (41ms vs mitjana 58ms). Sèries de dimecres reduïdes de 6×1km a
            5×1km. Tirada de diumenge mantinguda en Z2.
          </div>
        </div>
      </div>
    </div>
  );
}

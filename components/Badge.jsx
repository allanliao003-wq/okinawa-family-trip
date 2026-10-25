export function Badge({ children, tone = 'plain' }) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}
export function Empty({ children }) {
  return <p className="empty">{children}</p>;
}
export function Section({ title, children }) {
  return (
    <section className="block">
      {title && <h2>{title}</h2>}
      {children}
    </section>
  );
}

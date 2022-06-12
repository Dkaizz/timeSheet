import Header from '~/layouts/components/Header';
function HeaderOnly({ children }) {
  return (
    <div>
      <Header />
      <div className="Containent">
        <div className="content">{children}</div>
      </div>
    </div>
  );
}

export default HeaderOnly;
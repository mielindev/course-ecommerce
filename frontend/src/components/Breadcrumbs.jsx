import { Link } from "react-router-dom";

const Breadcrumbs = ({ breadcrumbs }) => {
  return (
    <div className="breadcrumbs text-sm text-base-content/50">
      <ul>
        {breadcrumbs.map((item, idx) => {
          {
            if (idx === breadcrumbs.length - 1) {
              return (
                <li key={idx} className="font-semibold cursor-pointer">
                  {item.name}
                </li>
              );
            } else {
              return (
                <li key={idx}>
                  <Link to={item.link}>{item.name}</Link>
                </li>
              );
            }
          }
        })}
      </ul>
    </div>
  );
};

export default Breadcrumbs;


import { Link } from "react-router-dom";

export default function Navbar({ onSearch }) {
  return (
<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <Link className="navbar-brand" to ="/">Home</Link>
  

  <div class="collapse navbar-collapse">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item ">
        <Link class="nav-link" to ="/add">Add </Link>
      </li>
      
    </ul>
     <form className="d-flex" role="search" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            className="form-control me-2"
            placeholder="Search by name..."
            onChange={(e) => onSearch(e.target.value)}
          />
        </form>
  </div>
</nav>);
}
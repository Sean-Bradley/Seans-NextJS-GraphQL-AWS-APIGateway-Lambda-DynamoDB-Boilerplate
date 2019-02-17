import Link from 'next/link'

export default () => (
  <div>
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <a className="navbar-brand" href="#">another seans boilerplate</a>
        </div>
        <ul className="nav navbar-nav">
          <li><Link href='/'><a>Home</a></Link></li>
          <li><Link href='/cats'><a>Cats</a></Link></li>
          <li><Link href='/dogs'><a>Dogs</a></Link></li>
          <li><Link href='/birds'><a>Birds</a></Link></li>
        </ul>
      </div>
    </nav>
  </div>
)

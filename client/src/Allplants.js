// import {formatISO9075} from "date-fns";
// import {Link} from "react-router-dom";

// export default function Allplants({_id, name,description,createdAt,author}) {

//   return (
//     <div className="plants">
//       <div className="image">
//         <Link to={`/plants/${_id}`}>
//           <img src={'http://localhost:3000/'+cover} alt=""/>
//         </Link>
//       </div>
//       <div className="texts">
//         <Link to={`/plants/${_id}`}>
//         <h2>{name}</h2>
//         </Link>
//         <p className="info">
//           <a className="author">{author.username}</a>
//           <time>{formatISO9075(new Date(createdAt))}</time>
//         </p>
//         <p className="description">{description}</p>
//       </div>
//     </div>
//   );
// }
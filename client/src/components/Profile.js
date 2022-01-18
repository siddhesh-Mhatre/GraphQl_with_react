import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import React,{useState,useEffect} from "react";
import { GET_MY_PROFILE } from "../gqloperation/queries";
import { useNavigate } from "react-router-dom";
import { DELETE_QUOTE,EDIT_QUOTE} from "../gqloperation/muations";
import Loading from "./Loading";



const Profile = () => {
 

  const [Edite, setEdite] = useState();
  const [UpadtedQuote,SetUpadtedQuote]=useState();
  const navigate = useNavigate();
// --------------------------GET OWN PROFILE INFO----------------------------------
const { loading, error, data } = useQuery(GET_MY_PROFILE);

// ----------------------- DELETE OWN QUOTE------------------------------------
const [deleteQuote, { DeletedQoteData, DeleteQuoteloading, Deleteerror }] =
    useMutation(DELETE_QUOTE, {
      refetchQueries: ["getAllQuotes", "getMyProfile"],
    });

// ----------------------- EDITE OWN QUOTE------------------------------------
 
const [editQuote,{EditQoteDate,EditQuoteLoading,QuoteEditEorr}]=useMutation(EDIT_QUOTE,{
  refetchQueries: ["getAllQuotes", "getMyProfile"],
});

 // -----------------------
  if (!localStorage.getItem("token")) {
    navigate("/login");
    return <h1>unauthorize</h1>;
  }
 // -----------------------
  if (loading) return <Loading/>;
  if (error) {
    window.location.reload();
  }
  // -----------------------
  if (DeleteQuoteloading) return <Loading/>;
  if (Deleteerror) {
    console.log(Deleteerror);
  }

  // ----------------------
  if (EditQuoteLoading) return <Loading/>;
  if (QuoteEditEorr) {
    console.log(QuoteEditEorr);
  }



  const deleteMyquote = (name, by) => {  //delete Quote
    deleteQuote({
      variables: {
        QuoteInfo: { name, by },
      },
    });
  };




const inputHandler=(e)=>{
  SetUpadtedQuote(e.target.value);
}

const sendEditQuote=(name,by)=>{    // submit Edited Quote 
editQuote({
  variables:{
    Quoteinfo:{name,by,UpadtedQuote}
  }
}) 
setEdite();
}


  return (
    <div className="container my-container">
      <div className="center-align">
        <img
          className="circle"
          style={{ border: "2px solid", marginTop: "10px" }}
          src={`https://robohash.org/${data.user.firstName}.png?size=200x200`}
          alt=""
          srcset=""
        />
        <h5>
      
          {data.user.firstName}
          {data.user.lastName}
        </h5>
        <h6>Email - {data.user.email}</h6>
      </div>
      <h3 className="center">Your Quots</h3>
      {data.user.quotes.map((quo,ind) => {
        return (
          <>
          <div>
            <blockquote>
      
              {
                ind===Edite?(<><input type="text" placeholder={quo.name} onChange={inputHandler}/> <input type="submit" onClick={()=>sendEditQuote(quo.name,quo.by)} className="btn green"/> <span onClick={()=>setEdite()} className="btn blue">X</span> </>):(<><h6>{quo.name}</h6></>)
              }
            </blockquote>
            <div className="btn_grup">
            <button onClick={() => deleteMyquote(quo.name, quo.by)} className="btn red">
              Delete
            </button>
            <button onClick={()=>setEdite(ind)} className="btn">edite</button>
            </div>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default Profile;

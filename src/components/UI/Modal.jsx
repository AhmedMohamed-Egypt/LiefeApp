
import ReactDOM from "react-dom"
import { UseFood } from "../../Context/FoodContext"

function Modal({children,onClick,title}) {
    const {hideModal} = UseFood()
    const BackDrop = ({onClick})=>{
        return <div className="modalBackdrop" onClick={onClick}></div>
    }
    const ModalContent = ({children,title})=>{
        return <div className="overlay__content">
      <div className="modal" tabIndex="-1" style={{display:'block',position:'static'}}>
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">{title}</h5>
        <button type="button" onClick={()=>hideModal()} className="btnClose btn size-20 pd-0" data-bs-dismiss="modal" aria-label="Close"><i className="bi bi-x-lg"></i>
</button>
      </div>
      <div className="modal-body">
        <p>{children}</p>
      </div>
   
    </div>
  </div>
</div>
        </div>
    }
 
    return (
        
        <>
        {ReactDOM.createPortal(<BackDrop onClick={onClick}/>,document.getElementById('overlay'))}
        {ReactDOM.createPortal(<ModalContent title={title}>{children}</ModalContent>,document.getElementById('overlay'))}

        </>

    )
}

export default Modal

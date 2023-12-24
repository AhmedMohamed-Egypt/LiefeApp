
import ReactDOM from "react-dom"
import { UseFood } from "../../Context/FoodContext"

function Modal({children,onClick,title,className}) {
    const {added} = UseFood()
    const BackDrop = ({onClickBkdrop})=>{
        return <div className="modalBackdrop" onClick={onClickBkdrop}></div>
    }
    const ModalContent = ({children,title,onClickBtn,classContent})=>{
        return <div className="overlay__content">
      <div className="modal" tabIndex="-1" style={{display:'block',position:'static'}}>
  <div className="modal-dialog">
    <div className="modal-content">
      <div className={`modal-header ${added?'redBk':'orangeBk'}`}>
        <h5 className="modal-title text-white">{title}</h5>
        <button type="button" onClick={onClickBtn} className="btnClose btn size-20 pd-0" data-bs-dismiss="modal" aria-label="Close"><i className="text-white bi bi-x-lg"></i>
</button>
      </div>
      <div className={`modal-body ${classContent}`}>
      {children}
      </div>
   
    </div>
  </div>
</div>
        </div>
    }
 
    return (
        
        <>
        {ReactDOM.createPortal(<BackDrop onClickBkdrop={onClick}/>,document.getElementById('overlay'))}
        {ReactDOM.createPortal(<ModalContent classContent={className} title={title} onClickBtn={onClick} >{children}</ModalContent>,document.getElementById('overlay'))}

        </>

    )
}

export default Modal

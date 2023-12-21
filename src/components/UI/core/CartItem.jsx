function CartItem({item}) {
    const {name,price,description,image} = item
 
    return (
        
        <div className={`col-sm-4 mb-25`}> 
          <div className="card pt-20 pb-20 pl-10 pr-10 foodLayout__card d-flex flex-row align-items-center">
          <div>
                <img className="boradius-10" src={image} alt="" />
            </div>
            <div className="foodLayout__card--content pl-25">
                <h2 className={`size-18 weight-700`}>{name}</h2>
                <h3 className={`size-15 weight-500`}>{description}</h3>
                <h4 className={`size-20 weight-600`}>${price}</h4>
            </div>
          </div>
        </div>
    )
}

export default CartItem

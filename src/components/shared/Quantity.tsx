
export interface QuantityProps {
    quantity: number
    onIncrease(): void
    onDecrease(): void
}

export const Quantity = ({quantity, onIncrease, onDecrease}: QuantityProps) => {
    return (
        <div className="inline-flex align-middle">
            <button className="btn-add-to-cart" onClick={onIncrease}><i className="fas fa-plus"></i></button>
            <span className="add-to-cart-quantity">{quantity}</span>
            <button className="btn-add-to-cart btn-decrease" onClick={onDecrease}><i className="fas fa-minus"></i></button>
        </div>
    );
};
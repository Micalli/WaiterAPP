import { useEffect } from "react";

import closeIcon from "../../assets/images/close-icon.svg";
import { Order } from "../../types/Order";
import { formatCurrency } from "../../utils/formatCurrency";

import { Overlay, ModalBody, OrderDetails, Actions } from "./style";

interface OrderModalProps {
  visible: boolean;
  order: Order | null;
  onClose: () => void;
  onCancelOrder: () => Promise<void>;
  isLoading: boolean;
  onChageOrderStatus: () => void;
}

export function OrderModal({
  visible,
  order,
  onClose,
  onCancelOrder,
  isLoading,
  onChageOrderStatus,
}: OrderModalProps) {
  if (!visible || !order) {
    return null;
  }
  const URL_IMAGES = "http://localhost:3001/uploads";

  const total = order.products.reduce((total, { product, quantity }) => {
    return total + product.price * quantity;
  }, 0);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);
  return (
    <Overlay>
      <ModalBody>
        <header>
          <strong>Mesa {order.table}</strong>
          <button type="button" onClick={onClose}>
            <img src={closeIcon} alt="Icone de fechar" />
          </button>
        </header>

        <div className="status-coitaner">
          <small>Status do pedido</small>
          <div>
            <span>
              {order.status === "WAITING" && "🕒"}
              {order.status === "IN_PRODUCTION" && "👩‍🍳"}
              {order.status === "DONE" && "✅"}
            </span>
            <strong>
              {order.status === "WAITING" && "Fila de espera"}
              {order.status === "IN_PRODUCTION" && "Em preparação"}
              {order.status === "DONE" && "Pronto!"}
            </strong>
          </div>
        </div>
        <OrderDetails>
          <strong>Itens</strong>

          <div className="order-itens">
            {order.products.map(({ _id, product, quantity }) => (
              <div className="item" key={_id}>
                <img
                  src={`${URL_IMAGES}/${product.imagePath}`}
                  alt={product.name}
                  width="56"
                  height="28.51"
                />
                <div className="quantity">{quantity}X</div>

                <div className="product-details">
                  <strong>{product.name}</strong>
                  <span>{formatCurrency(product.price)}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="total">
            <span>Total</span>
            <strong>{formatCurrency(total)}</strong>
          </div>
        </OrderDetails>

        <Actions>
          {order.status !== "DONE" && (
            <button
              type="button"
              className="primary"
              disabled={isLoading}
              onClick={onChageOrderStatus}
            >
              <span>
                {order.status === "WAITING" && "👩‍🍳"}
                {order.status === "IN_PRODUCTION" && "✅"}
              </span>
              <strong>
                {order.status === "WAITING" && "Iniciar Produção"}
                {order.status === "IN_PRODUCTION" && "Concluir pedido"}
              </strong>
            </button>
          )}

          <button
            type="button"
            className="secondary"
            onClick={onCancelOrder}
            disabled={isLoading}
          >
            Cancelar Pedido
          </button>
        </Actions>
      </ModalBody>
    </Overlay>
  );
}

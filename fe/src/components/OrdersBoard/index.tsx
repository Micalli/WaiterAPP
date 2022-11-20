import { useState } from "react";

import { Board, OrdersContainer } from "./style";
import { Order } from "../../types/Order";
import { OrderModal } from "../OrderModal";

interface OrdersBoardProps {
  icon: string;
  title: string;
  orders: Order[];
}

export function OrdersBoard(props: OrdersBoardProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectOrder, setSelectOrder] = useState<null | Order>(null);

  function handleOpenModal(order: Order) {
    setIsModalVisible(true);
    setSelectOrder(order);
  }

  function handleCloseModal(order: Order) {
    setIsModalVisible(false);
    setSelectOrder(null);
  }

  return (
    <Board>
      <OrderModal
        visible={isModalVisible}
        order={selectOrder}
        onClose={handleCloseModal}
      />
      <header>
        <span>{props.icon}</span>
        <strong>{props.title}</strong>
        <strong>({props.orders.length})</strong>
      </header>
      {props.orders.length > 0 && (
        <OrdersContainer>
          {props.orders.map((order) => (
            <button
              type="button"
              key={order._id}
              onClick={() => handleOpenModal(order)}
            >
              <strong>Mesa {order.table}</strong>
              <span>{order.products.length} Itens</span>
            </button>
          ))}
        </OrdersContainer>
      )}
    </Board>
  );
}

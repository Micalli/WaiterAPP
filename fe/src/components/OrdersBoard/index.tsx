import { useState } from "react";
import { toast } from "react-toastify";

import { Board, OrdersContainer } from "./style";
import { Order } from "../../types/Order";
import { OrderModal } from "../OrderModal";
import { api } from "../../utils/api";

interface OrdersBoardProps {
  icon: string;
  title: string;
  orders: Order[];
  onCancelOrder: (orderId: string) => void;
  onChangeOrderStatus: (orderId: string, status: Order["status"]) => void;
}

export function OrdersBoard({
  icon,
  title,
  orders,
  onCancelOrder,
  onChangeOrderStatus,
}: OrdersBoardProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectOrder, setSelectOrder] = useState<null | Order>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleChangeOrderStatus() {
    try {
      setIsLoading(true);
      const status =
        selectOrder!.status === "WAITING" ? "IN_PRODUCTION" : "DONE";
      await api.patch(`/orders/${selectOrder!._id}`, { status });
      toast.success(
        `O pedido da mesa ${selectOrder!.table} teve o status alterado!`
      );
      onChangeOrderStatus(selectOrder!._id, status);
      setIsLoading(false);
      setIsModalVisible(false);
    } catch (error) {
      console.log("LOG  handleChangeOrderStatus  error", error);
    }
  }

  async function handleCancelOrder() {
    setIsLoading(true);
    await api.delete(`/orders/${selectOrder?._id}`);
    toast.success(`O pedido da mesa ${selectOrder?.table} foi cancelado!`);
    onCancelOrder(selectOrder!._id);
    setIsLoading(false);
    setIsModalVisible(false);
  }

  function handleOpenModal(order: Order) {
    setIsModalVisible(true);
    setSelectOrder(order);
  }

  function handleCloseModal() {
    setIsModalVisible(false);
    setSelectOrder(null);
  }

  return (
    <Board>
      <OrderModal
        visible={isModalVisible}
        order={selectOrder}
        onClose={handleCloseModal}
        onCancelOrder={handleCancelOrder}
        isLoading={isLoading}
        onChageOrderStatus={handleChangeOrderStatus}
      />
      <header>
        <span>{icon}</span>
        <strong>{title}</strong>
        <strong>({orders.length})</strong>
      </header>
      {orders.length > 0 && (
        <OrdersContainer>
          {orders.map((order) => (
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

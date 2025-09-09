import { getAllOrders } from '@/lib/actions/order.actions';

export default async function OrderPage() {
  const orders = await getAllOrders();

  const createdOrders =
    orders?.filter((order) => order.status === 'isCreated') || [];
  const completedOrders =
    orders?.filter((order) => order.status === 'completed') || [];

  return (
    <div>
      <h1>Your Orders</h1>
      {orders.length === 0 ? (
        <p>You have no orders.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h2 className="text-xl font-bold mb-2">Created Orders</h2>
            {createdOrders.length === 0 ? (
              <p>No created orders.</p>
            ) : (
              <ul className="space-y-4">
                {createdOrders.map((order) => (
                  <li
                    key={order.id}
                    className="border p-4 rounded-md shadow-sm"
                  >
                    <p>Order ID: {order.id}</p>
                    <p>Total Amount: ${order.itemsPrice.toFixed(2)}</p>
                    <p>Status: {order.status}</p>
                    <p>
                      Created At: {new Date(order.createdAt).toLocaleString()}
                    </p>
                    <div>
                      <h3 className="font-semibold">Items:</h3>
                      <ul className="list-disc list-inside">
                        {order.orderItems.map((item) => (
                          <li key={item.id}>
                            {item.name} - Quantity: {item.quantity} - Price: $
                            {item.price.toFixed(2)}
                          </li>
                        ))}
                      </ul>
                    </div>
                    Shipping{' '}
                    {typeof order.shippingAddress === 'string'
                      ? order.shippingAddress
                      : JSON.stringify(order.shippingAddress)}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <h2 className="text-xl font-bold mb-2">Completed Orders</h2>
            {completedOrders.length === 0 ? (
              <p>No completed orders.</p>
            ) : (
              <ul className="space-y-4">
                {completedOrders.map((order) => (
                  <li
                    key={order.id}
                    className="border p-4 rounded-md shadow-sm"
                  >
                    <p>Order ID: {order.id}</p>
                    <p>Total Amount: ${order.itemsPrice.toFixed(2)}</p>
                    <p>Status: {order.status}</p>
                    <p>
                      Created At: {new Date(order.createdAt).toLocaleString()}
                    </p>
                    <div>
                      <h3 className="font-semibold">Items:</h3>
                      <ul className="list-disc list-inside">
                        {order.orderItems.map((item) => (
                          <li key={item.id}>
                            {item.name} - Quantity: {item.quantity} - Price: $
                            {item.price.toFixed(2)}
                          </li>
                        ))}
                      </ul>
                    </div>
                    Shipping
                    {typeof order.shippingAddress === 'string'
                      ? order.shippingAddress
                      : JSON.stringify(order.shippingAddress)}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

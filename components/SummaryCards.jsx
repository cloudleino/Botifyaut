import React from "react";

const SummaryCards = ({ data }) => {
    const { orders, users, revenue, products } = data;

    const cards = [
        { title: "Orders", value: orders, icon: "📦" },
        { title: "Users", value: users, icon: "👤" },
        { title: "Revenue", value: revenue?.toLocaleString() + " kr", icon: "💰" },
        { title: "Products", value: products, icon: "🛒" },
    ];

    return (
        <div className="row mb-4">
            {cards.map((card, idx) => (
                <div key={idx} className="col-md-3">
                    <div className="card text-center shadow-sm">
                        <div className="card-body">
                            <h5>{card.icon} {card.title}</h5>
                            <h3>{card.value || 0}</h3>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SummaryCards;

const response = await fetch("http://localhost:5000/api/leads", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: "Rahul Patil",
    phone: "9876543210",
    email: "rahul@gmail.com",
    source: "Website",
    message: "Interested in our services",
    status: "New",
    priority: "High",
    notes: "First test lead",
  }),
});

const data = await response.json();

console.log(data);
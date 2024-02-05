import jsPDF from 'jspdf';
import 'jspdf-autotable';

const generatePDF_user = (appointments) => {
  const pdf = new jsPDF();

  pdf.text('Appointments Report', 15, 15);

  const tableData = appointments.map((appointment, index) => [
    new Date(appointment.date).toLocaleString(),
    appointment.status,
    appointment.Service.name,
    `${appointment.Employee.first_name} ${appointment.Employee.last_name}`
  ]);

  const headers = ['Date', 'Status', 'Name', 'Employee'];
  pdf.autoTable({
    startY: 20,
    head: [headers],
    body: tableData,
  });

  pdf.save('appointments.pdf');
};

export default generatePDF_user;

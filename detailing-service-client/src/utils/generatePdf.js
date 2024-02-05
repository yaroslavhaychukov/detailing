import jsPDF from 'jspdf';
import 'jspdf-autotable';

const generatePDF = (data) => {
  const pdf = new jsPDF();

  pdf.text('Employees Report', 15, 15);

  const tableData = data.map((employee, index) => [
    employee.employee_id,
    employee.first_name,
    employee.last_name,
    employee.phone,
    `$${employee.hourly_rate}`
  ]);

  const headers = ['Employee ID', 'First Name', 'Last Name', 'Phone', 'Hourly Rate'];
  pdf.autoTable({
    startY: 20,
    head: [headers],
    body: tableData,
  });

  pdf.save('employees.pdf');
};

export default generatePDF;
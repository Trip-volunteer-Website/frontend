import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PaymentService } from 'src/app/Services/payment.service';
import * as XLSX from 'xlsx'; // For Excel export
import { jsPDF } from 'jspdf'; // For PDF generation
import html2canvas from 'html2canvas'; // For converting HTML to canvas
import Chart from 'chart.js/auto'; // For chart visualization
 
// Payment interface defining the data structure
interface Payment {
  paymentid: number;      
  paidat: string;          
  paymentmethod: string;  
  amount: number;          
  triprequests: any[];    
}
 
@Component({
  selector: 'app-total-revenu',      
  templateUrl: './total-revenu.component.html',  
  styleUrls: ['./total-revenu.component.css']  
})
export class TotalRevenuComponent implements OnInit {
  // Template reference variables for chart containers
  @ViewChild('monthlyChart') monthlyChartRef!: ElementRef;
  @ViewChild('yearlyChart') yearlyChartRef!: ElementRef;
 
  // Data storage arrays
  monthlyRevenue: { year: number, month: number, amount: number }[] = []; // Monthly breakdown
  yearlyRevenue: { year: number, amount: number }[] = [];                 // Yearly breakdown
 
  // Filtering variables with initial values
  selectedYear: number | null = null;    // Currently selected year filter
  selectedMonth: number | null = null;  // Currently selected month filter
  filteredMonthlyRevenue: any[] = [];    // Filtered monthly data for display
  filteredYearlyRevenue: any[] = [];     // Filtered yearly data for display
 
  // Chart instances
  monthlyChart: any;  // Instance of monthly chart
  yearlyChart: any;   // Instance of yearly chart
 
  // Filter option lists
  availableYears: number[] = [];  // Years with available data
  availableMonths: {value: number, name: string}[] = []; // Months (with names) for selected year
 
  // Constructor with dependency injection
  constructor(private paymentService: PaymentService) { }
 
  // Lifecycle hook - runs when component initializes
  ngOnInit(): void {
    this.loadRevenueData();  // Load data when component starts
  }
 
  // Main data loading function
  loadRevenueData() {
    this.paymentService.getPayments().subscribe(
      (payments: Payment[]) => {
        this.calculateRevenue(payments);  // Process raw payment data
        this.filterData();                // Apply initial filters
        setTimeout(() => this.renderCharts(), 0); // Render charts with slight delay
      },
      err => {
        console.error('Error loading data:', err); // Error handling
      }
    );
  }
 
  // Processes payment data into monthly/yearly summaries
  calculateRevenue(payments: Payment[]) {
    const monthlyMap = new Map<string, number>(); // Tracks amounts by year-month
    const yearlyMap = new Map<number, number>();  // Tracks amounts by year
 
    // Process each payment record
    payments.forEach(payment => {
      if (payment.paidat && payment.amount) {
        const date = new Date(payment.paidat);
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // Months are 0-indexed in JS
        const monthlyKey = `${year}-${month}`;
 
        // Accumulate monthly amounts
        monthlyMap.set(monthlyKey, (monthlyMap.get(monthlyKey) || 0) + payment.amount);
        // Accumulate yearly amounts
        yearlyMap.set(year, (yearlyMap.get(year) || 0) + payment.amount);
      }
    });
 
    // Convert monthly Map to typed array
    this.monthlyRevenue = Array.from(monthlyMap).map(([key, amount]) => {
      const [year, month] = key.split('-');
      return {
        year: parseInt(year),
        month: parseInt(month),
        amount: amount
      };
    });
 
    // Convert yearly Map to typed array
    this.yearlyRevenue = Array.from(yearlyMap).map(([year, amount]) => ({
      year: year,
      amount: amount
    }));
 
    // Sort data chronologically
    this.monthlyRevenue.sort((a, b) => a.year - b.year || a.month - b.month);
    this.yearlyRevenue.sort((a, b) => a.year - b.year);
   
    // Extract unique years for filter dropdown
    this.availableYears = [...new Set(this.monthlyRevenue.map(item => item.year))].sort((a, b) => b - a);
  }
 
  // Handles year filter changes
  onYearChange() {
    this.selectedYear = this.selectedYear ? Number(this.selectedYear) : null;
    this.selectedMonth = null; // Reset month selection
    this.updateAvailableMonths(); // Refresh month options
    this.filterData(); // Reapply filters
  }
 
  // Updates available months based on selected year
  updateAvailableMonths() {
    if (this.selectedYear !== null) {
      const selectedYearNumber = Number(this.selectedYear);
      const filtered = this.monthlyRevenue.filter(item => item.year === selectedYearNumber);
     
      // Create month options with proper names
      this.availableMonths = [...new Set(filtered.map(item => item.month))]
        .sort((a, b) => a - b)
        .map(month => ({
          value: month,
          name: this.getMonthName(month)
        }));
    } else {
      this.availableMonths = []; // Clear if no year selected
    }
  }
 
  // Handles month filter changes
  onMonthChange() {
    this.filterData();
  }
 
  // Renders charts after view initialization
  ngAfterViewInit() {
    this.renderCharts();
  }
 
  // Creates/updates chart visualizations
  renderCharts() {
    // Monthly Chart (Bar Chart)
    if (this.monthlyChart) {
      this.monthlyChart.destroy(); // Clean up previous instance
    }
   
    const monthlyCtx = this.monthlyChartRef?.nativeElement.getContext('2d');
    if (monthlyCtx && this.filteredMonthlyRevenue.length > 0) {
      const labels = this.filteredMonthlyRevenue.map(item =>
        `${this.getMonthName(item.month)} ${item.year}`
      );
      const data = this.filteredMonthlyRevenue.map(item => item.amount);
 
      this.monthlyChart = new Chart(monthlyCtx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Monthly Revenue',
            data: data,
            backgroundColor: 'rgba(235, 105, 54, 0.5)',
            borderColor: 'rgb(244, 156, 113)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Monthly Revenue Report'
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Amount ($)'
              }
            }
          }
        }
      });
    }
 
    // Yearly Chart (Line Chart)
    if (this.yearlyChart) {
      this.yearlyChart.destroy();
    }
   
    const yearlyCtx = this.yearlyChartRef?.nativeElement.getContext('2d');
    if (yearlyCtx && this.filteredYearlyRevenue.length > 0) {
      const labels = this.filteredYearlyRevenue.map(item => item.year.toString());
      const data = this.filteredYearlyRevenue.map(item => item.amount);
 
      this.yearlyChart = new Chart(yearlyCtx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Yearly Revenue',
            data: data,
            backgroundColor: 'rgba(235, 105, 54, 0.5)',
            borderColor: 'rgb(244, 156, 113)',
            borderWidth: 2,
            tension: 0.1,
            fill: true
          }]
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Yearly Revenue Report'
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Amount (JOD)'
              }
            }
          }
        }
      });
    }
  }
 
  // Helper: Converts month number to name
  getMonthName(month: number): string {
    const months = [
      'January', 'Feb', 'March', 'April',
      'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'
    ];
    return months[month - 1]; // Adjust for 0-based array
  }
 
  // Applies current filters to data
  filterData() {
    this.filteredMonthlyRevenue = this.monthlyRevenue.filter(item => {
      const yearMatch = this.selectedYear ? item.year === this.selectedYear : true;
      const monthMatch = this.selectedMonth ? item.month === this.selectedMonth : true;
      return yearMatch && monthMatch;
    });
 
    this.filteredYearlyRevenue = this.selectedYear
      ? this.yearlyRevenue.filter(item => item.year === this.selectedYear)
      : [...this.yearlyRevenue];
   
    this.renderCharts(); // Update visualizations
  }
 
  // Export functions
  exportToExcel(type: 'monthly' | 'yearly') {
    const data = type === 'monthly'
      ? this.filteredMonthlyRevenue.map(item => ({
          Year: item.year,
          Month: this.getMonthName(item.month),
          Amount: item.amount
        }))
      : this.filteredYearlyRevenue.map(item => ({
          Year: item.year,
          Amount: item.amount
        }));
 
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Revenue Report');
   
    const fileName = type === 'monthly'
      ? `Monthly_Revenue_${new Date().toISOString().slice(0,10)}.xlsx`
      : `Yearly_Revenue_${new Date().toISOString().slice(0,10)}.xlsx`;
   
    XLSX.writeFile(workbook, fileName);
  }
 
  exportToPDF(type: 'monthly' | 'yearly') {
    const elementId = type === 'monthly' ? 'monthly-section' : 'yearly-section';
    const element = document.getElementById(elementId);
   
    if (element) {
      html2canvas(element).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
       
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${type === 'monthly' ? 'Monthly' : 'Yearly'}_Revenue_${new Date().toISOString().slice(0,10)}.pdf`);
      });
    }
  }
}
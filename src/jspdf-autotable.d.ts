declare module "jspdf" {
    interface jsPDF {
        autoTable: (columns: any[], data: any[], options?: any) => jsPDF;
    }
}
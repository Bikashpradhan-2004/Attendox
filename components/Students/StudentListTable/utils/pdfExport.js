"use client";

const loadPdfLibraries = () => {
  return new Promise((resolve, reject) => {
    if (window.jspdf?.jsPDF) {
      resolve();
      return;
    }

    const jsPdfScript = document.createElement("script");
    jsPdfScript.src =
      "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";

    const autoTableScript = document.createElement("script");
    autoTableScript.src =
      "https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.31/jspdf.plugin.autotable.min.js";

    jsPdfScript.onload = () => {
      document.head.appendChild(autoTableScript);

      autoTableScript.onload = () => resolve();
      autoTableScript.onerror = () =>
        reject(new Error("Failed to load jspdf-autotable"));
    };

    jsPdfScript.onerror = () =>
      reject(new Error("Failed to load jsPDF"));

    document.head.appendChild(jsPdfScript);
  });
};

export const exportAgGridToPdf = async ({
  gridRef,
  columnDefs,
  title = "Student List",
  fileName = "students.pdf",
}) => {
  try {
    await loadPdfLibraries();

    if (!gridRef?.current?.api) {
      alert("Table not ready. Please try again.");
      return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF("portrait");

    if (typeof doc.autoTable !== "function") {
      throw new Error("AutoTable plugin not loaded");
    }

    const rows = [];
    gridRef.current.api.forEachNodeAfterFilterAndSort((node) => {
      rows.push(node.data);
    });

    const exportColumns = columnDefs.filter(
      (col) => col.field && col.field !== "actions" && !col.cellRenderer
    );

    const headers = exportColumns.map(
      (col) => col.headerName || col.field
    );

    const body = rows.map((row) =>
      exportColumns.map((col) => {
        const value = row[col.field];

        if (col.valueFormatter) {
          return col.valueFormatter({ value, data: row });
        }

        if (value === null || value === undefined) return "";
        if (typeof value === "boolean") return value ? "Yes" : "No";

        return String(value);
      })
    );

    doc.setFontSize(16);
    doc.setFont(undefined, "bold");
    doc.text(title, 14, 20);

    doc.setFontSize(10);
    doc.setFont(undefined, "normal");
    doc.text(
      `Generated on: ${new Date().toLocaleString()}`,
      14,
      28
    );

    doc.autoTable({
      head: [headers],
      body,
      startY: 35,
      theme: "striped",
      headStyles: {
        fillColor: [37, 99, 235],
        textColor: 255,
        fontStyle: "bold",
      },
      styles: {
        fontSize: 9,
        cellPadding: 3,
        overflow: "linebreak",
      },
      didDrawPage: (data) => {
        doc.setFontSize(8);
        doc.setTextColor(120);
        doc.text(
          `Page ${data.pageNumber}`,
          doc.internal.pageSize.width / 2,
          doc.internal.pageSize.height - 10,
          { align: "center" }
        );
      },
    });

    doc.save(fileName);
  } catch (error) {
    console.error("PDF export failed:", error);
    alert(error.message || "Failed to export PDF");
  }
};

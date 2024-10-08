// import React, { useRef, useEffect } from "react";
// import * as d3 from "d3";

// // Define the type for each data point
// interface BubbleData {
//   name: string;
//   size: number;
//   color: string;
// }

// const BubbleChart: React.FC = () => {
//   const svgRef = useRef<SVGSVGElement | null>(null);

//   useEffect(() => {
//     const data: BubbleData[] = [
//       { name: "Bookings and Reservations", size: 50, color: "#7ecbff" },
//       { name: "Spa and Wellness Services", size: 40, color: "#f3d19e" },
//       { name: "Billing and Payment Inquiries", size: 45, color: "#d4baff" },
//       { name: "Dining and Culinary Preferences", size: 35, color: "#ffcbc5" },
//       { name: "Transportation and Directions", size: 30, color: "#fde2f3" },
//       { name: "Accommodation and Facilities", size: 40, color: "#e5e9eb" },
//       {
//         name: "Marketing, Promotions, and Loyalty Programs",
//         size: 30,
//         color: "#f7d4d0",
//       },
//       { name: "Events and Activities", size: 20, color: "#eedddd" },
//       { name: "Customer Feedback and Complaints", size: 35, color: "#fff2be" },
//       {
//         name: "Special Requests and Personalization",
//         size: 45,
//         color: "#cee6cc",
//       },
//     ];

//     const width = 600;
//     const height = 600;

//     // Create an SVG element
//     const svg = d3
//       .select(svgRef.current)
//       .attr("width", width)
//       .attr("height", height);

//     // Create a pack layout to size the bubbles
//     const pack = d3.pack<BubbleData>().size([width, height]).padding(10);

//     // Create the root node with the correct structure
//     const root = d3
//       .hierarchy<any>({ children: data })
//       .sum((d) => (d as BubbleData).size)
//       .sort((a, b) => b.value! - a.value!);

//     const bubbleData = pack(root).leaves();

//     const bubbles = svg
//       .selectAll<SVGGElement, d3.HierarchyCircularNode<BubbleData>>("g")
//       .data(bubbleData)
//       .enter()
//       .append("g")
//       .attr("transform", (d) => `translate(${d.x},${d.y})`);

//     // Add circles for each bubble
//     bubbles
//       .append("circle")
//       .attr("r", (d) => d.r)
//       .attr("fill", (d) => d.data.color)
//       .attr("stroke", "none");

//     // Add labels inside the bubbles with proper text wrapping
//     bubbles
//       .append("text")
//       .style("font-size", (d) => `${Math.min(d.r / 4, 18)}px`)
//       .style("text-anchor", "middle")
//       .attr("dy", ".35em") // Center vertically
//       .attr("fill", "#333")
//       .each(function (d) {
//         // const words = d.data.name.split(/\s+/).reverse(); // Split words preserving spaces
//         // let line: string[] = [];
//         // const lineHeight = 1.1;
//         // const tspan = d3
//         //   .select(this)
//         //   .text(null)
//         //   .append("tspan")
//         //   .attr("x", 0)
//         //   .attr("y", 0);
//         // let lineNumber = 0;

//         // while (words.length) {
//         //   line.push(words.pop()!);
//         //   tspan.text(line.join(" "));
//         //   if (this.getComputedTextLength() > d.r * 1.8) {
//         //     line.pop();
//         //     tspan.text(line.join(" "));
//         //     line = [words.pop()!];
//         //     lineNumber++;
//         //     d3.select(this)
//         //       .append("tspan")
//         //       .attr("x", 0)
//         //       .attr("y", `${lineNumber * lineHeight}em`)
//         //       .text(line[0]);
//         //   }
//         // }

//         const words = d.data.name.split(/\s+/);
//         console.log("words", words);

//         // let word: string | undefined;
//         let line: string = "";
//         let noOfLine = 0;
//         const lineHeight = 1.1; // ems
//         // const tspan = d3
//         //   .select(this)
//         //   .text(null)
//         //   .append("tspan")
//         //   .attr("x", 0)
//         //   .attr("y", 0);
//         // tspan.text("line.joindshbjchsmnbfj");
//         // tspan.text("line.join");
//         // d3.select(this)
//         //   .append("tspan")
//         //   .attr("x", 0)
//         //   .attr("dy", noOfLine * lineHeight + "em")
//         //   .text("word");
//         // console.log(
//         //   "this.getComputedTextLength() > d.r * 2",
//         //   this.getComputedTextLength() > d.r * 2,
//         //   this.getComputedTextLength(),
//         //   d.r
//         // );

//         words.forEach((word) => {
//           line += word + " ";
//           d3.select(this)
//             .append("tspan")
//             .attr("x", 0)
//             .attr("dy", noOfLine * lineHeight + "em")
//             .text(line);

//           if (this.getComputedTextLength() > d.r * 2) {
//             noOfLine++;
//             line = "";
//           }
//         });

//         //   while ((word = words.pop())) {
//         //   line.push(word);
//         //   tspan.text(line.join(" "));
//         //   if (this.getComputedTextLength() > d.r * 2) {
//         //     line.pop();
//         //     tspan.text(line.join(" "));
//         //     line = [word];
//         //     d3.select(this)
//         //       .append("tspan")
//         //       .attr("x", 0)
//         //       .attr("dy", lineHeight + "em")
//         //       .text(word);
//         //   }
//         // }
//       });
//   }, []);

//   return <svg ref={svgRef}></svg>;
// };

// export default BubbleChart;

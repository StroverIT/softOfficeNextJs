function TableData({ children, classes }) {
  return (
    <td className={`w-full lg:w-auto ${classes ? classes : ""}`}>{children}</td>
  );
}
export default TableData;

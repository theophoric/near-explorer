import React from "react";
interface Props {
  category: string;
  count: number;
}
export default ({ category, count }: Props) => {
  if (count === 0) {
    return null;
  }
  return (
    <div className="update">
      {count > 1 ? (
        <p className="update-text">
          {`${count} total ${category}s. Refresh or Click to view the latest ${category}s.`}
        </p>
      ) : (
        <p className="update-text">
          {`${count} total ${category}. Refresh or Click to view the latest ${category}.`}
        </p>
      )}
      <style>{`
      .update{
        width: 100%;
        background: rgba(106, 209, 227, 0.15);
        color: #6ab9e3;
        padding: 5px 10px;
        cursor:pointer;
      }
      .update:active{
        background: rgba(106, 209, 227, 0.5)
      }

      .update-text {
        margin: 3px;
      }
      `}</style>
    </div>
  );
};

interface iSearchModalPros {
  isOpen: boolean,
  onClose: Function
}

const SearchModal = (props: iSearchModalPros) => {
  if (!props.isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 bg-[rgba(0,0,0,0.8)]">
      <div className="p-8">
        <button onClick={() => props.onClose()} className="absolute top-4 right-4 text-gray-600">
          X
        </button>
        Lorem ipsum dolor sit amet
      </div>
    </div>
  );
};

export default SearchModal
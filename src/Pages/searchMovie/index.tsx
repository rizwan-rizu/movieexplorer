interface iSearchModalPros {
  isOpen: boolean,
  onClose: Function
}

const SearchModal = (props: iSearchModalPros) => {
  if (!props.isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black-50">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <button onClick={props.onClose()} className="absolute top-4 right-4 text-gray-600">
          X
        </button>
        Lorem ipsum dolor sit amet
      </div>
    </div>
  );
};

export default SearchModal
function sectionExists(obj, id) {
  return obj.some(function (el) {
    return el._id === id;
  });
}
async function Fetch(checkedProducts, generalPromo) {
  const foundItems = {
    sections: [],
    subsections: [],
    items: [],
  };

  checkedProducts.forEach((section) => {
    if (section.isSelected) {
      foundItems.sections.push({
        _id: item._id,
        isWhole: true,
        customPromo: section.customPromo,
      });
    } else {
      section.subsection.forEach((sub) => {
        if (sub.isSelected) {
          foundItems.subsections.push({
            _id: sub._id,
            isWhole: true,
            customPromo: sub.customPromo,
          });
          // Checker
          const isFound = sectionExists(foundItems.sections, section._id);
          if (!isFound)
            foundItems.sections.push({
              _id: section._id,
              isWhole: false,
              customPromo: null,
            });
          // End checker
        } else {
          sub.items.forEach((item) => {
            if (item.isSelected) {
              foundItems.items.push({
                _id: item._id,
                customPromo: item.customPromo,
              });
              // Checker
              const sectionFound = sectionExists(
                foundItems.sections,
                section._id
              );
              const subFound = sectionExists(foundItems.subsections, sub._id);

              if (!sectionFound)
                foundItems.sections.push({
                  _id: section._id,
                  isWhole: false,
                  customPromo: null,
                });
              if (!subFound)
                foundItems.subsections.push({
                  _id: sub._id,
                  isWhole: false,
                  customPromo: null,
                });
              // End checker
            }
          });
        }
      });
    }
  });

  console.log(foundItems);
  const sendObject = {
    ...foundItems,
    generalPromo,
  };
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(sendObject),
  };
  const res = await fetch(`/api/promotions/personal/create`, options);

  return res.json();
}
export default Fetch;

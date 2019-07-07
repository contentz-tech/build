const { jsx, Styled } = require("theme-ui");
const format = require("date-fns/format");
const { useIntl } = require("./intl");

exports.Title = Styled.h1;

exports.Description = props =>
  jsx(
    "p",
    Object.assign({}, props, {
      sx: {
        borderLeft: "3px solid black",
        boxSizing: "border-box",
        pl: 2,
        mt: -4,
        mr: 0,
        ml: 4,
        ml: -2,
        fontSize: 5,
        fontWeight: "light",
      }
    }),
    props.children
  );

exports.Date = props => {
  const { messages, language } = useIntl();
  const locale = require(`date-fns/locale/${language}`);

  return jsx(
    "time",
    Object.assign({}, props, {
      dateTime: props.date.toJSON(),
      sx: {
        position: "absolute",
        right: 2,
        bottom: "100%"
      }
    }),
    messages.lead.postedOn,
    jsx("strong", null, format(props.date, "MMMM DD, YYYY", { locale }))
  );
};

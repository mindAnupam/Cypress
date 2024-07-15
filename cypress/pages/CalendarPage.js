import BasePage from "./BasePage";

class CalendarPage extends BasePage {
  constructor() {
    super();
    this.url = "/calendar";
    this.dateRangeInput = "input.is-datetimepicker-range";
    this.todayButton = ".datetimepicker-footer-today";
    this.dateSelector =
      '.datepicker-date[data-date*="{date}"] button.date-item';
    this.selectedDateRange = "p[_ngcontent-serverapp-c60]";
    this.timePickerHoursNext = ".timepicker-hours .timepicker-next";
    this.timePickerHoursInput = ".timepicker-hours .timepicker-input-number";
  }

  visit() {
    super.visit(this.url);
  }

  selectTodayAsStartDate() {
    this.getElement(this.dateRangeInput).first().click();
    this.getElement(this.todayButton).last().click();
  }

  selectFutureDateAsEndDate(daysFromNow) {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + daysFromNow);
    const formattedDate = this.formatDate(futureDate);
    this.getElement(this.dateSelector.replace("{date}", formattedDate))
      .last()
      .click();
  }

  verifySelectedDateRange() {
    const today = new Date();
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 3);

    const formattedToday = this.formatDateForVerification(today);
    const formattedFutureDate = this.formatDateForVerification(futureDate);

    this.getElement(this.selectedDateRange)
      .first()
      .should("contain", formattedToday);
    this.getElement(this.selectedDateRange)
      .first()
      .should("contain", formattedFutureDate);
  }

  adjustTime(hours) {
    for (let i = 0; i < hours; i++) {
      this.getElement(this.timePickerHoursNext).click();
    }
  }

  verifyAdjustedTime(expectedHours) {
    this.getElement(this.timePickerHoursInput).should(
      "have.text",
      expectedHours
    );
  }

  formatDate(date) {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${monthNames[date.getMonth()]} ${date
      .getDate()
      .toString()
      .padStart(2, "0")} ${date.getFullYear()}`;
  }

  formatDateForVerification(date) {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${date.getDate().toString().padStart(2, "0")}-${
      monthNames[date.getMonth()]
    }-${date.getFullYear()}`;
  }
}

export default new CalendarPage();

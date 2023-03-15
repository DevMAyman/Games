/// <reference types="../@types/jquery" />
export class Home {
  constructor(theCurrentTab) {
    this.modifyMyHome(theCurrentTab);
  }
  modifyMyHome(theCurrentTab) {
    $(".category").removeClass("active");
    $(theCurrentTab).addClass("active");
    $(".nav-link").removeClass("active");
    $(`[href='${theCurrentTab}']`).addClass("active");
  }
}

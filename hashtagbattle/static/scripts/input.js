$(document).ready(function() {
  $("input#hashtag_bar").on({
    keydown: function(e) {
      if (e.which === 32)
        return false;
      if(this.value.charAt(0) != '#')
        this.value = '#' + this.value;
    },
    change: function() {
      this.value = this.value.replace(/\s/g, "");
      if(this.value.charAt(0) != '#')
        this.value = '#' + this.value;
    },
    click: function() {
      if(this.value.length < 1)
        this.value = '#';
    },
    focusout: function() {
      console.log(this.value);
      if(this.value == '#')
        this.value = '';
    }
  });
});

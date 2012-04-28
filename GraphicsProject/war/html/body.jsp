<body>
  <noscript>
    <p>Please enable JavaScript to use this program.</p>
  </noscript>
  <div class="top_bar">
    <h1>CSCI 7000 - WebGl Based Image Editor</h1>
  </div>
  <div class="side_bar">
    <div class="control_buttons">
      <button class="load">Load</button>
      <button class="save">Save</button>
      <button class="3dview">3D Mode</button>
    </div>
    <jsp:include page="sidebar/twoDEffects.html" />
    <jsp:include page="sidebar/threeDModes.html" />
  </div>
  <div class="main_view"></div>
</body>
/* eslint-disable prefer-arrow-callback,prefer-template,max-len */
Package.describe({
  name:          'centiq:testing',
  version:       '0.1.0',
  summary:       'A set of tools and libraries to enable easy testing with meteor',
  git:           '',
  documentation: 'README.md',
  testOnly:      true,
});

Package.onUse(function onUse(api) {

  api.versionsFrom('1.3.5.1');

  /**
   * Dependancies
   */
  api.use('ecmascript');
  api.use('accounts-base',                      [ 'server', 'client' ]);
  api.use('http',                               [ 'server' ]);
  api.use('underscore',                         [ 'client', 'server' ]);
  api.use('service-configuration',              [ 'client', 'server' ]);
  api.use('practicalmeteor:mocha-core@1.0.0',   [ 'client', 'server' ]);
  api.use('practicalmeteor:chai@2.1.0_1',       [ 'client', 'server' ]);

  /**
   * 1. exec `find . -type f` within the slimer folder to create a list of files
   * 2. addAssets to  the list of files.
   *
   * Note: All the files are needed!
   * @type {Array}
   */
  [ 'omni.ja', 'LICENSE', 'application.ini', 'slimerjs.bat', 'slimerjs', 'README.md', 'slimerjs.py', 'chrome/icons/default/default32.png',  'chrome/icons/default/slimerjswin.ico',  'chrome/icons/default/default48.png',  'vendors/ghostdriver/request_handlers/status_request_handler.js',  'vendors/ghostdriver/request_handlers/webelement_request_handler.js',  'vendors/ghostdriver/request_handlers/request_handler.js',  'vendors/ghostdriver/request_handlers/session_manager_request_handler.js',  'vendors/ghostdriver/request_handlers/shutdown_request_handler.js',  'vendors/ghostdriver/request_handlers/router_request_handler.js',  'vendors/ghostdriver/request_handlers/session_request_handler.js',  'vendors/ghostdriver/session.js',  'vendors/ghostdriver/lastupdate',  'vendors/ghostdriver/webelementlocator.js',  'vendors/ghostdriver/ghostdriver.qrc',  'vendors/ghostdriver/webdriver_atoms.js',  'vendors/ghostdriver/errors.js',  'vendors/ghostdriver/hub_register.js',  'vendors/ghostdriver/logger.js',  'vendors/ghostdriver/config.js',  'vendors/ghostdriver/third_party/console++.js',  'vendors/ghostdriver/third_party/webdriver-atoms/remove_session_storage_item.js',  'vendors/ghostdriver/third_party/webdriver-atoms/find_element.js',  'vendors/ghostdriver/third_party/webdriver-atoms/get_local_storage_item.js',  'vendors/ghostdriver/third_party/webdriver-atoms/execute_script.js',  'vendors/ghostdriver/third_party/webdriver-atoms/set_window_size.js',  'vendors/ghostdriver/third_party/webdriver-atoms/get_session_storage_item.js',  'vendors/ghostdriver/third_party/webdriver-atoms/execute_sql.js',  'vendors/ghostdriver/third_party/webdriver-atoms/get_window_position.js',  'vendors/ghostdriver/third_party/webdriver-atoms/frame_by_index.js',  'vendors/ghostdriver/third_party/webdriver-atoms/get_current_position.js',  'vendors/ghostdriver/third_party/webdriver-atoms/lastupdate',  'vendors/ghostdriver/third_party/webdriver-atoms/set_session_storage_item.js',  'vendors/ghostdriver/third_party/webdriver-atoms/move_mouse.js',  'vendors/ghostdriver/third_party/webdriver-atoms/clear_local_storage.js',  'vendors/ghostdriver/third_party/webdriver-atoms/default_content.js',  'vendors/ghostdriver/third_party/webdriver-atoms/active_element.js',  'vendors/ghostdriver/third_party/webdriver-atoms/get_local_storage_size.js',  'vendors/ghostdriver/third_party/webdriver-atoms/get_attribute.js',  'vendors/ghostdriver/third_party/webdriver-atoms/get_top_left_coordinates.js',  'vendors/ghostdriver/third_party/webdriver-atoms/get_session_storage_size.js',  'vendors/ghostdriver/third_party/webdriver-atoms/rotate.js',  'vendors/ghostdriver/third_party/webdriver-atoms/set_local_storage_item.js',  'vendors/ghostdriver/third_party/webdriver-atoms/scroll_into_view.js',  'vendors/ghostdriver/third_party/webdriver-atoms/find_elements.js',  'vendors/ghostdriver/third_party/webdriver-atoms/focus_on_element.js',  'vendors/ghostdriver/third_party/webdriver-atoms/right_click.js',  'vendors/ghostdriver/third_party/webdriver-atoms/get_size.js',  'vendors/ghostdriver/third_party/webdriver-atoms/get_location_in_view.js',  'vendors/ghostdriver/third_party/webdriver-atoms/set_window_position.js',  'vendors/ghostdriver/third_party/webdriver-atoms/submit.js',  'vendors/ghostdriver/third_party/webdriver-atoms/pinch.js',  'vendors/ghostdriver/third_party/webdriver-atoms/get_appcache_status.js',  'vendors/ghostdriver/third_party/webdriver-atoms/type.js',  'vendors/ghostdriver/third_party/webdriver-atoms/get_location.js',  'vendors/ghostdriver/third_party/webdriver-atoms/frame_by_id_or_name.js',  'vendors/ghostdriver/third_party/webdriver-atoms/is_selected.js',  'vendors/ghostdriver/third_party/webdriver-atoms/tap.js',  'vendors/ghostdriver/third_party/webdriver-atoms/remove_local_storage_item.js',  'vendors/ghostdriver/third_party/webdriver-atoms/get_text.js',  'vendors/ghostdriver/third_party/webdriver-atoms/get_window_size.js',  'vendors/ghostdriver/third_party/webdriver-atoms/execute_async_script.js',  'vendors/ghostdriver/third_party/webdriver-atoms/double_click.js',  'vendors/ghostdriver/third_party/webdriver-atoms/swipe.js',  'vendors/ghostdriver/third_party/webdriver-atoms/scroll_mouse.js',  'vendors/ghostdriver/third_party/webdriver-atoms/get_frame_window.js',  'vendors/ghostdriver/third_party/webdriver-atoms/is_displayed.js',  'vendors/ghostdriver/third_party/webdriver-atoms/get_in_view_location.js',  'vendors/ghostdriver/third_party/webdriver-atoms/get_value_of_css_property.js',  'vendors/ghostdriver/third_party/webdriver-atoms/is_enabled.js',  'vendors/ghostdriver/third_party/webdriver-atoms/clear_session_storage.js',  'vendors/ghostdriver/third_party/webdriver-atoms/drag.js',  'vendors/ghostdriver/third_party/webdriver-atoms/is_online.js',  'vendors/ghostdriver/third_party/webdriver-atoms/get_session_storage_keys.js',  'vendors/ghostdriver/third_party/webdriver-atoms/clear.js',  'vendors/ghostdriver/third_party/webdriver-atoms/get_local_storage_keys.js',  'vendors/ghostdriver/third_party/webdriver-atoms/deps.js',  'vendors/ghostdriver/third_party/webdriver-atoms/get_element_from_cache.js',  'vendors/ghostdriver/third_party/webdriver-atoms/click.js',  'vendors/ghostdriver/third_party/webdriver-atoms/get_attribute_value.js',  'vendors/ghostdriver/third_party/uuid.js',  'vendors/ghostdriver/third_party/har.js',  'vendors/ghostdriver/third_party/parseuri.js',  'vendors/ghostdriver/README.md',  'vendors/ghostdriver/inputs.js',  'vendors/ghostdriver/main.js' ].forEach(function cb(R) {

    api.addAssets('vendor/slimerjs/' + R, [ 'server' ]);

  });

  /**
   * Assets
   */
  api.addAssets('server/slimer.js', 'server');

  /**
   * Client side
   */
  api.mainModule('client/manager.js', 'client');

  /**
   * Server Side
   */
  api.mainModule('server/manager.js', 'server');

});

Package.onTest(function onTest(api) {

  api.use('ecmascript');
  api.use('tinytest');
  api.use('centiq:testing');

});

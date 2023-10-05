require "test_helper"

class PerformanceControllerTest < ActionDispatch::IntegrationTest
  test "should get performance" do
    get performance_performance_url
    assert_response :success
  end
end

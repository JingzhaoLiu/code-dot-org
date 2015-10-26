require 'test_helper'
require 'dynamic_config/dcdo'


class DCDOTest < ActiveSupport::TestCase
  test 'basic set and get' do
    DCDO.set('key', 'okay')
    assert_equal DCDO.get('key', nil), 'okay'
  end

  test 'returns default if key is not stored' do
    assert_equal DCDO.get('UNSET_key', 123), 123
  end

  test 'storing hashes' do
    to_store = {
      'b' => 'yo dude',
      'c' => [1,2,3]
    }
    key = 'random'
    DCDO.set(key, to_store)
    assert_equal DCDO.get(key, nil), to_store
  end

  test 'returns default if fetching fails' do
    $dcdo_cache.stubs(:get).throws(StandardError)

    key = 'okay'
    value = 'whatev'
    DCDO.set(key, 12345)
    assert_equal DCDO.get(key, value), value
  end

  test 'storing a non-jsonable object fails' do
    class RandomClass
    end

    assert_raises do
      DCDO.set(key, RandomClass.new)
    end
  end
end

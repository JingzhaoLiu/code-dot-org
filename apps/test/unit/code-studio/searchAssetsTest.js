/** @file Test of searchAssetsTest.js. */

var assert = require('assert');
import {searchAssets} from '@cdo/apps/code-studio/assets/searchAssets';
var animationLibrary = require('@cdo/apps/gamelab/animationLibrary.json');
var soundLibrary = require('@cdo/apps/code-studio/soundLibrary.json');

describe('search assets from animation library', function () {
  let maxResults = 5;
  let pageCount = 0;

  it('searchAssets searches the animation library in a category', function () {
    const searchedData = searchAssets('hip', 'category_animals', animationLibrary, pageCount, maxResults);

    assert.equal(searchedData.pageCount, 1);
    assert.equal(searchedData.results.length, 3);
    assert.equal(searchedData.results[0].name, "hippo");
    assert.equal(searchedData.results[1].name, "hippo_square");
    assert.equal(searchedData.results[2].name, "hippo_token");
  });

  it('searchAssets searches the animation library without a category', function () {
    const searchedData = searchAssets('hip', '', animationLibrary, pageCount, maxResults);

    assert.equal(searchedData.pageCount, 1);
    assert.equal(searchedData.results.length, 3);
    assert.equal(searchedData.results[0].name, "hippo");
    assert.equal(searchedData.results[1].name, "hippo_square");
    assert.equal(searchedData.results[2].name, "hippo_token");
  });

  it('searchAssets searches the sound library with a cateogry', function () {
    const searchedData = searchAssets('click', 'category_ui', soundLibrary, pageCount, maxResults);

    assert.equal(searchedData.pageCount, 1);
    assert.equal(searchedData.results.length, 5);
    assert.equal(searchedData.results[0].name, "click1");
    assert.equal(searchedData.results[1].name, "click2");
    assert.equal(searchedData.results[2].name, "click3");
    assert.equal(searchedData.results[3].name, "click4");
    assert.equal(searchedData.results[4].name, "click5");
  });

  it('searchAssets finds results where search term is not at the begining', function () {
    const searchedData = searchAssets('square', '', animationLibrary, pageCount, maxResults);

    assert.equal(searchedData.results.length, 5);
    assert.equal(searchedData.results[0].name, "elephant_square");
    assert.equal(searchedData.results[1].name, "giraffe_square");
    assert.equal(searchedData.results[2].name, "hippo_square");
    assert.equal(searchedData.results[3].name, "monkey_square");
    assert.equal(searchedData.results[4].name, "panda_square");
  });

  it('searchAssets searches the sound library without a cateogry, using multiple pages', function () {
    maxResults = 4;
    const searchedData = searchAssets('click', '', soundLibrary, pageCount, maxResults);

    assert.equal(searchedData.pageCount, 2);
    assert.equal(searchedData.results.length, 4);
    assert.equal(searchedData.results[0].name, "click1");
    assert.equal(searchedData.results[1].name, "click2");
    assert.equal(searchedData.results[2].name, "click3");
    assert.equal(searchedData.results[3].name, "click4");
  });

  it('searchAssets searches the sound library getting page 2 results', function () {
    maxResults = 4;
    pageCount = 1;
    const searchedData = searchAssets('click', '', soundLibrary, pageCount, maxResults);

    assert.equal(searchedData.pageCount, 2);
    assert.equal(searchedData.results.length, 1);
    assert.equal(searchedData.results[0].name, "click5");
  });
});

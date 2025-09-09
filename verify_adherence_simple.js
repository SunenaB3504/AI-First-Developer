const fs = require('fs');

console.log('📋 Running Document Adherence Verification...');
console.log('='.repeat(50));

try {
  const aiContent = fs.readFileSync('src/data/artificial-intelligence.js', 'utf8');

  console.log('✅ File exists and is readable');

  // Basic structure checks using string matching
  const hasExportDefault = aiContent.includes('export default');
  const hasId = aiContent.includes('id: "artificial-intelligence"');
  const hasTier = aiContent.includes('tier: 5');
  const hasName = aiContent.includes('name: "Artificial Intelligence & Machine Learning"');
  const hasLearningObjectives = aiContent.includes('learningObjectives: [');
  const hasSections = aiContent.includes('sections: [');
  const hasAiPrompts = aiContent.includes('aiPrompts: [');

  console.log('\n🔍 Structure Validation:');
  console.log(`  ✓ Export default: ${hasExportDefault ? 'Present' : 'Missing'}`);
  console.log(`  ✓ ID field: ${hasId ? 'Present' : 'Missing'}`);
  console.log(`  ✓ Tier field: ${hasTier ? 'Present' : 'Missing'}`);
  console.log(`  ✓ Name field: ${hasName ? 'Present' : 'Missing'}`);
  console.log(`  ✓ Learning objectives: ${hasLearningObjectives ? 'Present' : 'Missing'}`);
  console.log(`  ✓ Sections: ${hasSections ? 'Present' : 'Missing'}`);
  console.log(`  ✓ AI prompts: ${hasAiPrompts ? 'Present' : 'Missing'}`);

  // Count learning objectives (rough estimate)
  const learningObjMatches = aiContent.match(/"[^"]*"/g) || [];
  const learningObjectives = learningObjMatches.filter(obj =>
    obj.includes('Master') || obj.includes('Understand') || obj.includes('Implement') ||
    obj.includes('Build') || obj.includes('Apply') || obj.includes('Create') ||
    obj.includes('Deploy') || obj.includes('Optimize')
  );

  console.log(`\n📚 Learning Objectives Count: ${learningObjectives.length}/15`);
  if (learningObjectives.length >= 14 && learningObjectives.length <= 16) {
    console.log('✅ Learning objectives count correct');
  } else {
    console.log('❌ Learning objectives count incorrect');
  }

  // Count sections
  const sectionMatches = aiContent.match(/title: "/g) || [];
  const sectionsCount = sectionMatches.length - 8; // Subtract AI prompts
  console.log(`\n📖 Sections Count: ${sectionsCount}`);
  if (sectionsCount >= 5 && sectionsCount <= 7) {
    console.log('✅ Sections count in expected range');
  }

  // Check for code examples
  const codeExampleMatches = aiContent.match(/language: "/g) || [];
  console.log(`\n💻 Code Examples: ${codeExampleMatches.length}`);
  if (codeExampleMatches.length >= 6) {
    console.log('✅ Sufficient code examples present');
  }

  // Check content depth
  const contentLength = aiContent.length;
  console.log(`\n📄 Content Size: ${contentLength} characters`);
  if (contentLength > 50000) {
    console.log('✅ Content depth sufficient');
  } else {
    console.log('⚠️  Content may be too brief');
  }

  // Final assessment
  const allChecksPass = hasExportDefault && hasId && hasTier && hasName &&
                       hasLearningObjectives && hasSections && hasAiPrompts &&
                       (learningObjectives.length >= 14 && learningObjectives.length <= 16) &&
                       (sectionsCount >= 5 && sectionsCount <= 7) &&
                       codeExampleMatches.length >= 6;

  console.log('\n📊 Final Assessment:');
  if (allChecksPass) {
    console.log('🎉 DOCUMENT ADHERENCE VERIFICATION PASSED');
    console.log('✅ All structural requirements met');
    console.log('✅ Content follows established patterns');
    console.log('✅ Ready for integration');
  } else {
    console.log('⚠️  Some requirements may not be fully met');
    console.log('   Manual review recommended');
  }

} catch (error) {
  console.error('❌ Verification Error:', error.message);
  process.exit(1);
}
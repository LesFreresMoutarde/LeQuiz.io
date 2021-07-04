<?php


namespace App\Manager;


use App\Repository\CategoryRepository;
use App\Repository\QuestionTypeRepository;
use App\Repository\TagRepository;

class CrudManager
{
    /**
     * @var CategoryRepository
     */
    private CategoryRepository $categoryRepository;
    /**
     * @var QuestionTypeRepository
     */
    private QuestionTypeRepository $questionTypeRepository;
    /**
     * @var TagRepository
     */
    private TagRepository $tagRepository;

    /**
     * CrudManager constructor.
     * @param CategoryRepository $categoryRepository
     * @param QuestionTypeRepository $questionTypeRepository
     * @param TagRepository $tagRepository
     */
    public function __construct
    (
        CategoryRepository $categoryRepository,
        QuestionTypeRepository $questionTypeRepository,
        TagRepository $tagRepository
    ) {
        $this->categoryRepository = $categoryRepository;
        $this->questionTypeRepository = $questionTypeRepository;
        $this->tagRepository = $tagRepository;
    }

    public function getCategories()
    {
        return $this->categoryRepository->findBy([], ['label' => 'ASC']);
    }

    public function getQuestionTypes()
    {
        return $this->questionTypeRepository->findBy([], ['label' => 'ASC']);
    }

    public function getTags()
    {
        return $this->tagRepository->findBy([], ['label' => 'ASC']);
    }

}
